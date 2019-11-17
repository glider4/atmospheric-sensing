library(readr)
library(lubridate)
library(ggplot2)

# Read data, view cleaned
raw_data <- read_csv("test_ingestion.txt")
raw_data$date <- gsub('\\[|\\]', ' ', raw_data$date)
raw_data$date <- ymd_hms(raw_data$date)

View(raw_data)


# Temperature
ggplot(raw_data, aes(x=date, y=`temperature (C)`)) + geom_line(color='blue')

# Humidity
ggplot(raw_data, aes(x=date, y=`humidity (% relative)`)) + geom_line(color='blue')

# Pressure
ggplot(raw_data, aes(x=date, y=`pressure (hPa)`)) + geom_line(color='blue')
