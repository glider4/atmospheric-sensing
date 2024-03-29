# atmospheric-sensing
This project is based off of MicroBit's WeatherBit extension, which has sensors to read a variety of
meteorological characteristics.


### Tech, goals, strategy
The idea behind this project was to build a weather reporting station that could sense a 
number of basic atmospheric indicators like pressure, temperature, and relative humidity, and
then branch off into other concepts like air quality, CO2 sensing, etc.  The microbit, paired
with the very capable weatherbit extension makes the initial setup easy.

There is capability to make this project completely wireless.  I do have the physical sensors for
wind speed (anemometer with proper connection to WeatherBit), as well as the rain gauge and
wind direction vane, however, these are large components that I can't easily mount within USB-cable
distance of a PC.  The OpenLog integration is nice on the WeatherBit, but physically moving a 
MicroSD in and out whenever I want to see data is far too much of a hassle when I can serial straight
to my PC via USB.

### Latest Temperature (C) plot - auto generated using R

Data recorded in Massachusetts, USA, and plotted with ggplot2.

![temp_plot](https://github.com/mathemacode/atmospheric-sensing/blob/master/weatherbit_ingestion/latest_temp_plot.png)

### TODOs / Current state of project
TODO: Figure out how to rotate log files so that a new .txt is created every... day? week?

TODO: Figure out how to connect CO2 sensor to WeatherBit, or through Arduino RedBoard

TODO: Use soil temperature sensor (waterproof) for additional temp reading?

TODO: Initialize Arduino RedBoard (waiting on USB cable)

TODO: Extrapolate more values in `extrapolate.R`

TODO: Organize `weatherbit_ingestion` better as more raw data files get added


### Electronics & parts list
[WeatherBit on Sparkfun.com](https://www.sparkfun.com/search/results?term=weatherbit)

![weatherbit](https://github.com/mathemacode/atmospheric-sensing/blob/master/pics_plots/sparkfun_photo.jpg)

- SparkFun micro:Climate Kit:
    - MicroBit
    - WeatherBit
    - soil sensor
    - waterproof temp sensor
    - jumper wires
    - OpenLog (note: not necessary with serial USB setup to PC)
- Arduino RedBoard
- 6ft Micro USB cable
- SparkFun CCS811 Air Quality breakout board
- MicroSD card and adapter, if you want to go the OpenLog route


### Recommended coding applications, resources, etc
- PyCharm or Anaconda Spyder (included with Anaconda Navigator download)
- Tera Term, for serial connection with PC and great auto-logging capabilities
    - **IMPORTANT** If you use the auto logging function in Tera Term, it does NOT put a comma between 
    the date and what's being logged!  I compensated by setting my WeatherBit to log like ",temp,press,humid"
    (note leading comma)
- Microsoft MakeCode app for Windows, highly recommended to quicken unboxing to first use process
    - note that it can "block-ify" Javascript code, and you can develop using blocks or writing JS, it auto converts
- SparkFun has multiple guides on the micro:Climate kit and MicroBit - note comments section for bugs found


### Things that were not obvious during initial setup
- OpenLog seems to purge its logs on the SD card if I just rip the USB out
    - Similar note: you must stop the writing process before taking out USB, and I suspect this is why
    the SparkFun team went the extra mile to code in a button to start and stop the process.  Power on/off to
    start/stop the writing will not work with OpenLog (from what I can tell so far)
- Also the pin settings to use OpenLog were in the SparkFun guide and worked, remember to change if using serial USB
- Serial connection requires special MicroBit drivers (easy google to find, but nowhere in tutorials)
- My MakeCode app will connect to the MicroBit for uploading code, BUT, not for live data viewing (all sensors read 0)
- **MakeCode requires an extension to use temp,press,humidity,etc as an input (code format is weather.temperature), 
etc.  Left side of app Advanced --> Extensions, search for weatherbit**
- The WeatherBit actually reads finer details than what SparkFun's integer-based code suggests
    - You can use just temperature/100 instead of integer divison in the JavaScript code


## Results - Import 1
Impressive!  Temperature really needs more granularity at this time scale, (update - granularity has been increased) 
but I think in the long run it'll work out.

A little bit of ggplot fanciness and:

![import1result](https://github.com/mathemacode/atmospheric-sensing/blob/master/pics_plots/import_11-18-2019/temp_humid_press_plot.png)


## Granularity fix
With WeatherBit running on all decimals:

![granular_result](https://github.com/mathemacode/atmospheric-sensing/blob/master/pics_plots/import_append_11-19-2019/allvals_size1.PNG)

This increases the file size by a lot, and for the life of me I couldn't get a good round function to 
work properly in JavaScript and load onto the board.
