// This is the bone stock code from Microsoft MakeCode in the SparkFun tutorial
// Link: https://makecode.microbit.org/#pub:_XcJFj7V3oHVT

input.onButtonPressed(Button.A, function () {
    if (logging_data == 0) {
        logging_data = 1
        basic.showLeds(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
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
let row = ""
let header = ""
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
    SerialPin.P15,
    SerialPin.P14,
    BaudRate.BaudRate9600
    )
    header = "time" + "," + "temperature" + "," + "humidity" + "," + "pressure" + "," + "altitude"
    serial.writeLine(header)
    logging_data = 0
}
basic.forever(function () {
    if (logging_data == 1) {
        row = "" + input.runningTime() + "," + Math.idiv(weatherbit.temperature(), 100) + "," + Math.idiv(weatherbit.humidity(), 1024) + "," + Math.idiv(weatherbit.pressure(), 25600) + "," + weatherbit.altitude()
        serial.writeLine(row)
        basic.pause(1 * 30000)
    }
})
