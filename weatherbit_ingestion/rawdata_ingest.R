# Ingest weather data, clean it, make basic plots

library(readr)
library(lubridate)
library(ggplot2)

# Read file:
# ====================================================================
raw_data <- read_csv("weatherlog_2_test_decimals.txt", skip = 1)
# ====================================================================

# Clean up, prepare for plots / extrapolation
names(raw_data) <- c("date", "temp_c", "rel_humid", "press_hpa")

d_idx <- which(names(raw_data) == "date")             # Index of influenced factor (no rounding needed)
raw_data[,-d_idx] <- round(raw_data[,-d_idx], 2)      # Round rest of data to 2 decimal places
raw_data$date <- gsub('\\[|\\]', '', raw_data$date)   # Remove TeraTerm's [ ] format for timestamp
raw_data$date <- ymd_hms(raw_data$date)               # Implement Lubridate for datetimes

# Temperature
temp_plot <- ggplot(raw_data, aes(x=date, y=`temp_c`)) + geom_line(color='blue', size=1.5) + ggtitle("Temperature (C)")

# Humidity
humid_plot <- ggplot(raw_data, aes(x=date, y=`rel_humid`)) + geom_line(color='darkgreen', size=1.5) + ggtitle("Relative Humidity %")

# Pressure
press_plot <- ggplot(raw_data, aes(x=date, y=`press_hpa`)) + geom_line(color='orange', size=1.5) + ggtitle("Pressure (hPa)")

# Temp, Humid%, Press side-by-side
require(gridExtra)
grid.arrange(temp_plot, humid_plot, press_plot, ncol=3)
