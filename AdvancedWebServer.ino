
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <FS.h>

ESP8266WebServer server;
uint8_t pin_led = 2;
char* ssid = "phill";
char* password = "00000000";
int sw = 12;
void setup()
{
  SPIFFS.begin();
  pinMode(pin_led, OUTPUT);
  pinMode(sw,INPUT);
  WiFi.begin(ssid,password);
  Serial.begin(115200);
  while(WiFi.status()!=WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }
  Serial.println("");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  server.on("/",serveIndexFile);
  server.on("/toggle_led.html",serveToggleLedFile);
  server.on("/ledstate",getLEDState);
  server.begin();
}

void loop()
{
  if (digitalRead(sw) == 0){
    getLEDState();
    delay(500);
  }
  server.handleClient();
}

void serveIndexFile()
{
  File file = SPIFFS.open("/index.html","r");
  server.streamFile(file, "text/html");
  file.close();
}

void serveToggleLedFile()
{
  File file = SPIFFS.open("/toggle_led.html","r");
  server.streamFile(file, "text/html");
  file.close();
}

void toggleLED()
{
  digitalWrite(pin_led,!digitalRead(pin_led));
}

void getLEDState()
{
  toggleLED();
  String led_state = digitalRead(pin_led) ? "Off" : "on";
  server.send(200,"text/plain", led_state);
}
