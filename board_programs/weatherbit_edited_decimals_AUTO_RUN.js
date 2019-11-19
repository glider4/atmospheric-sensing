// No buttons to be pressed - once booted up, auto runs and communicates via serial

let row = ""
weatherbit.startWeatherMonitoring()
serial.redirect(
    SerialPin.USB_TX,
    SerialPin.USB_RX,
    BaudRate.BaudRate9600
)
serial.writeLine("")
serial.writeLine("date, temperature (C), humidity (% relative), pressure (hPa)")
let logging_data = 1


basic.forever(function () {
    if (logging_data == 1) {
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . # # # .
            . # # # .
            `)
        row = "," + (weatherbit.temperature() / 100) + "," + (weatherbit.humidity() / 1024) + "," + (weatherbit.pressure() / 25600)
        serial.writeLine(row)
        basic.pause(1 * 30000)
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
