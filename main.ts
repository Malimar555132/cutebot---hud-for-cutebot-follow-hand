radio.onReceivedValue(function (name, value) {
    if (name == "lled") {
        if (value == 1) {
            cuteBot.colorLight(cuteBot.RGBLights.RGB_R, 0xff0000)
        } else if (value == 2) {
            cuteBot.colorLight(cuteBot.RGBLights.RGB_R, 0x00ffff)
        } else {
            cuteBot.colorLight(cuteBot.RGBLights.RGB_R, 0x00ff00)
        }
    } else if (name == "rled") {
        if (value == 1) {
            cuteBot.colorLight(cuteBot.RGBLights.RGB_L, 0xff0000)
        } else if (value == 2) {
            cuteBot.colorLight(cuteBot.RGBLights.RGB_L, 0x00ffff)
        } else {
            cuteBot.colorLight(cuteBot.RGBLights.RGB_L, 0x00ff00)
        }
    }
})
let light2 = 0
let sonar = 0
radio.setGroup(2)
basic.forever(function () {
    sonar = cuteBot.ultrasonic(cuteBot.SonarUnit.Centimeters)
    radio.sendValue("sonar", sonar)
    light2 = input.lightLevel()
    radio.sendValue("light", light2)
    if (sonar <= 15) {
        cuteBot.motors(-25, -25)
        radio.sendValue("rwheel", -25)
        radio.sendValue("lwheel", -25)
    } else if (15 < sonar && sonar <= 25) {
        cuteBot.motors(0, 0)
        radio.sendValue("rwheel", 0)
        radio.sendValue("lwheel", 0)
    } else if (sonar > 25) {
        cuteBot.motors(50, 50)
        radio.sendValue("rwheel", 50)
        radio.sendValue("lwheel", 50)
    }
    if (cuteBot.tracking(cuteBot.TrackingState.L_R_line)) {
        radio.sendValue("ltrack", 1)
    } else if (cuteBot.tracking(cuteBot.TrackingState.L_unline_R_line)) {
        radio.sendValue("ltrack", 2)
    } else if (cuteBot.tracking(cuteBot.TrackingState.L_line_R_unline)) {
        radio.sendValue("ltrack", 3)
    } else {
        radio.sendValue("ltrack", 4)
    }
    basic.pause(20)
})
