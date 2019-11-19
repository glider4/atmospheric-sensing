# Ingest weather data, clean it, extrapolate more information

library(dplyr)
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

df <- raw_data

# Calculate dewpoint
a = 17.62
b = 243.12 # deg Celcius
rh = df$rel_humid
t = df$temp_c
alpha = log(rh/100) + (a*t)/(b+t)

# Final calculation
dewpnt_c = (b * alpha) / (a - alpha)

# Mutate new column onto df with dewpoint in Celcius
df <- df %>% 
  mutate("dewpoint" = round(dewpnt_c,2))


