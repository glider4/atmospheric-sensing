# Ingest weather data, clean it, make basic plots
# TODO: standardize input for real files, test out on overnight data

library(readr)
library(lubridate)
library(ggplot2)

# Read data, view cleaned
raw_data <- read_csv("weatherlog_1.txt", skip = 1)
names(raw_data) <- c("date", "temp_c", "rel_humid", "press_hpa")
raw_data$date <- gsub('\\[|\\]', '', raw_data$date)
raw_data$date <- ymd_hms(raw_data$date)

View(raw_data)


# Temperature
ggplot(raw_data, aes(x=date, y=`temp_c`)) + geom_line(color='blue') + ggtitle("Temperature (C)")

# Humidity
ggplot(raw_data, aes(x=date, y=`rel_humid`)) + geom_line(color='darkgreen') + ggtitle("Relative Humidity %")

# Pressure
ggplot(raw_data, aes(x=date, y=`press_hpa`)) + geom_line(color='orange') + ggtitle("Pressure in hPa")
