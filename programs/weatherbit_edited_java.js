// This code adapted and edited based off of Sparkfun's WeatherBit guide in Microsoft MakeCode (JavaScript)

// On startup, write header line for data
// Set up USB TX/RX or datalogger via SD (Pins 14 & 15)
let row = ""
let logging_data = 0
logging_data = -1
basic.showLeds(`
    # . . . #
    . # . # .
    . . # . .
    . # . # .
    # . . . #
    `)
while (logging_data == -1) {
    weatherbit.startWeatherMonitoring()
    serial.redirect(
    SerialPin.USB_TX,
    SerialPin.USB_RX,
    BaudRate.BaudRate9600
    )
    serial.writeLine("")
    serial.writeLine("temperature (C), humidity (% relative), pressure (hPa)")
    logging_data = 0
    basic.showLeds(`
        # . . . #
        # . . . #
        # # # # #
        # . . . #
        . # # # .
        `)
}


// Press A button to start logging, should give a check mark then
// LEDs will begin station pattern
// To stop logging, press A button again, will show X
input.onButtonPressed(Button.A, function () {
    if (logging_data == 0) {
        logging_data = 1
        basic.showLeds(`
            . . . # .
            . . # . #
            . # . . .
            # . . . .
            . . . . .
            `)
    } else if (logging_data == 1) {
        logging_data = 0
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
})


// Station pattern while writing rows of data
basic.forever(function () {
    if (logging_data == 1) {
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . # # # .
            . # # # .
            `)
        row = "," + Math.idiv(weatherbit.temperature(), 100) + "," + Math.idiv(weatherbit.humidity(), 1024) + "," + Math.idiv(weatherbit.pressure(), 25600)
        serial.writeLine(row)
        basic.pause(1 * 10000)
        basic.showLeds(`
            . . # . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.showLeds(`
            . . # . .
            . . # . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . . . .
            `)
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . # # # .
            . . . . .
            `)
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . # # # .
            . # # # .
            `)
    }
})
