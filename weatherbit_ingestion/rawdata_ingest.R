# Ingest weather data, clean it, make basic plots

library(readr)
library(lubridate)
library(ggplot2)

# Read file:
# ====================================================================
raw_data <- read_csv("weatherlog_1.txt", skip = 1)
# ====================================================================

# Clean up, prepare for plots / extrapolation
names(raw_data) <- c("date", "temp_c", "rel_humid", "press_hpa")
raw_data[,-1] <- round(raw_data[,-1], 2)
raw_data$date <- gsub('\\[|\\]', '', raw_data$date)
raw_data$date <- ymd_hms(raw_data$date)

# Temperature
temp_plot <- ggplot(raw_data, aes(x=date, y=`temp_c`)) + geom_line(color='blue', size=2) + ggtitle("Temperature (C)")

# Humidity
humid_plot <- ggplot(raw_data, aes(x=date, y=`rel_humid`)) + geom_line(color='darkgreen', size=2) + ggtitle("Relative Humidity %")

# Pressure
press_plot <- ggplot(raw_data, aes(x=date, y=`press_hpa`)) + geom_line(color='orange', size=2) + ggtitle("Pressure (hPa)")

# Temp, Humid%, Press side-by-side
require(gridExtra)
grid.arrange(temp_plot, humid_plot, press_plot, ncol=3)
