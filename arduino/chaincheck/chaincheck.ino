/* ChainCheck
 * 
 * Prototype monitoring system for package containers using sensors and NarrowBand IoT.
 *
 * Copyright (c) 2019 Ryan Keller, Conner Starkel, Aaron Peterson, McKaulay Kolakowski
 */

#include <Seeed_ws2812.h>
#include <BreakoutSDK.h>
#include <DHT.h>

#define LOOP_INTERVAL (1 * 1000)
#define SEND_INTERVAL (10 * 60 * 1000)
#define DHT_PIN (D20)
#define DHTTYPE DHT11

static const char *device_purpose = "Dev-Kit";
static const char *psk_key = "9a90b83ed1cdf52f2e786f57ce464575";

Breakout *breakout = &Breakout::getInstance();
DHT dht(DHT_PIN, DHTTYPE);
WS2812 strip = WS2812(1, RGB_LED_PIN);

void enableLed() {
  pinMode(RGB_LED_PWR_PIN, OUTPUT);
  digitalWrite(RGB_LED_PWR_PIN, HIGH);
  strip.begin();
  strip.brightness = 5;
}

void sendCommand(const char * command) {
  if (breakout->sendTextCommand(command) == COMMAND_STATUS_OK) {
    LOG(L_INFO, "Tx-Command [%s]\r\n", command);
  } else {
    LOG(L_INFO, "Tx-Command ERROR\r\n");
  }
}

String queryGPS() {
  gnss_data_t data;
  LOG(L_INFO, "Getting GPS data...\r\n");
  breakout->getGNSSData(&data);
    if (data.valid) {
      LOG(L_INFO, "GPS data is OK.\r\n");
    } else {
      LOG(L_WARN, "GPS data not valid! Check reception.\r\n");
    }
  String latdeg = String(data.position.latitude_degrees);
  String latmin = String(data.position.latitude_minutes);
  String londeg = String(data.position.longitude_degrees);
  String lonmin = String(data.position.longitude_minutes);
  // default values for isNorth,isWest
  String isNorth = "N";
  String isWest = "W";
  isNorth = data.position.is_north ? "N" : "S" ;
  isWest = data.position.is_west ? "W" : "E";
  String gpsinfo = String(latdeg + "," +
          latmin + "," + isNorth + "," + londeg + "," +
          lonmin + "," + isWest);
  return gpsinfo;
  }

  String queryDHTSensor(){
    LOG(L_INFO, "Polling DHT sensor...\r\n");
    String temp = String(dht.readTemperature(),1);
    String humid = String(dht.readHumidity());
    String dhtinfo = String(temp + "," + humid);
    return dhtinfo;
  }

  bool queryTilt(){
    LOG(L_INFO, "Polling tilt sensor...\r\n");
    if(digitalRead(38)==HIGH){;
      return true;
    } else {
      return false;
    }
  }


/**
 * Setting up the Arduino platform. This is executed once, at reset.
 */
void setup() {
  // Feel free to change the log verbosity. E.g. from most critical to most verbose:
  //   - errors:   L_ERR
  //   - warnings: L_WARN
  //   - information: L_INFO
  //   - debug: L_DBG
  //
  // When logging, the additional L_CLI level ensure that the output will always be visible, no matter the set level.
  owl_log_set_level(L_INFO);
  LOG(L_WARN, "Arduino setup() starting up\r\n");

  dht.begin();
  enableLed();
  // Set RGB-LED to red
  strip.WS2812SetRGB(0, 0x40, 0x00, 0x00);
  strip.WS2812Send();

  // Set the Breakout SDK parameters
  breakout->setPurpose(device_purpose);
  breakout->setPSKKey(psk_key);
  breakout->setPollingInterval(10 * 60);  // Optional, by default set to 10 minutes

  // Powering the modem and starting up the SDK
  LOG(L_WARN, "Powering on module and registering...");
  breakout->powerModuleOn();

  const char command[] = "DEVICE_ACTIVE";

  if (breakout->sendTextCommand(command) == COMMAND_STATUS_OK) {
    LOG(L_INFO, "Tx-Command [%s]\r\n", command);
  } else {
    LOG(L_INFO, "Tx-Command ERROR\r\n");
  }

  // Set RGB-LED to green
  strip.WS2812SetRGB(0, 0x00, 0x40, 0x00);
  strip.WS2812Send();

  LOG(L_WARN, "... done powering on and registering.\r\n");
  LOG(L_WARN, "Arduino loop() starting up\r\n");
}

/**
 * This is the main loop, which will run forever. Keep the breakout->spin() call, such that the SDK
 * will be able to handle modem events, incoming data, trigger retransmissions and so on.
 *
 * Add in this loop calls to your own application functions. But don't block or sleep inside them.
 *
 * The delay (sleep) here helps conserve power, hence it is advisable to keep it.
 */
void loop() {
  // Add here the code for your application, but don't block
  String gps = queryGPS();
  String dht = queryDHTSensor();
  String tilt = "F";
  if(queryTilt()){
    tilt = "T";
  }

  String outgoinginfo = String(gps + "," + dht + "," + tilt);
  char command[outgoinginfo.length()+1];
  outgoinginfo.toCharArray(command,outgoinginfo.length()+1);
  LOG(L_INFO,"Outgoing data: [%s]\r\n",command);
  if(breakout->isPowered()){
    strip.WS2812SetRGB(0, 0x00, 0x40, 0x00);
    strip.WS2812Send();
    sendCommand(command);
    // The Breakout SDK checking things and doing the work
    breakout->spin();   
  } else {
    LOG(L_WARN, "Modem is powered down. Data not sent.\r\n");
    strip.WS2812SetRGB(0, 0x20, 0x20, 0x00);
    strip.WS2812Send();
  }


  delay(10000);
}
