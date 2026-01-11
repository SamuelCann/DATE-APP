// Populate year dropdown
function populateYears(selectId, defaultYear = null) {
    const select = document.getElementById(selectId);
    for (let year = 1900; year <= 2100; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        if (defaultYear && year === defaultYear) {
            option.selected = true;
        }
        select.appendChild(option);
    }
}

// Get days in month
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// Populate day dropdown
function populateDays(selectId, month, year, defaultDay = null) {
    const select = document.getElementById(selectId);
    const currentValue = select.value;
    select.innerHTML = '<option value="">Day</option>';
    
    if (month && year) {
        const daysInMonth = getDaysInMonth(parseInt(month), parseInt(year));
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day;
            if (defaultDay && day === defaultDay) {
                option.selected = true;
            } else if (!defaultDay && currentValue && day === parseInt(currentValue)) {
                option.selected = true;
            }
            select.appendChild(option);
        }
        
        // If current value is invalid (e.g., 31 in February), clear it
        if (currentValue && parseInt(currentValue) > daysInMonth) {
            select.value = '';
        }
    }
}

// Set today's date as default
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Populate year dropdowns
    populateYears('startYear', today.getFullYear());
    populateYears('endYear', tomorrow.getFullYear());
    
    // Set default months
    document.getElementById('startMonth').value = today.getMonth() + 1;
    document.getElementById('endMonth').value = tomorrow.getMonth() + 1;
    
    // Populate and set default days
    populateDays('startDay', today.getMonth() + 1, today.getFullYear(), today.getDate());
    populateDays('endDay', tomorrow.getMonth() + 1, tomorrow.getFullYear(), tomorrow.getDate());
    
    // Update day dropdowns when month or year changes
    document.getElementById('startMonth').addEventListener('change', function() {
        const month = this.value;
        const year = document.getElementById('startYear').value;
        if (month && year) {
            populateDays('startDay', month, year);
        }
    });
    
    document.getElementById('startYear').addEventListener('change', function() {
        const year = this.value;
        const month = document.getElementById('startMonth').value;
        if (month && year) {
            populateDays('startDay', month, year);
        }
    });
    
    document.getElementById('endMonth').addEventListener('change', function() {
        const month = this.value;
        const year = document.getElementById('endYear').value;
        if (month && year) {
            populateDays('endDay', month, year);
        }
    });
    
    document.getElementById('endYear').addEventListener('change', function() {
        const year = this.value;
        const month = document.getElementById('endMonth').value;
        if (month && year) {
            populateDays('endDay', month, year);
        }
    });
});

// Validate date
function isValidDate(day, month, year) {
    if (!day || !month || !year) return false;
    const date = new Date(year, month - 1, day);
    return date.getDate() === parseInt(day) && 
           date.getMonth() === month - 1 && 
           date.getFullYear() === parseInt(year);
}

// Calculate difference between two dates
function calculateDateDifference(startDay, startMonth, startYear, endDay, endMonth, endYear) {
    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);
    
    if (endDate < startDate) {
        return null; // End date is before start date
    }
    
    let years = endYear - startYear;
    let months = endMonth - startMonth;
    let days = endDay - startDay;
    
    // Adjust for negative days
    if (days < 0) {
        months--;
        const lastDayOfPrevMonth = new Date(endYear, endMonth - 1, 0).getDate();
        days += lastDayOfPrevMonth;
    }
    
    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return { years, months, days };
}

// Format result text
function formatResult(diff) {
    if (!diff) {
        return 'End date must be after start date!';
    }
    
    const parts = [];
    
    if (diff.years > 0) {
        parts.push(`${diff.years} year${diff.years !== 1 ? 's' : ''}`);
    }
    
    if (diff.months > 0) {
        parts.push(`${diff.months} month${diff.months !== 1 ? 's' : ''}`);
    }
    
    if (diff.days > 0) {
        parts.push(`${diff.days} day${diff.days !== 1 ? 's' : ''}`);
    }
    
    if (parts.length === 0) {
        return 'The dates are the same!';
    }
    
    if (parts.length === 1) {
        return parts[0];
    }
    
    if (parts.length === 2) {
        return `${parts[0]} and ${parts[1]}`;
    }
    
    return `${parts[0]}, ${parts[1]}, and ${parts[2]}`;
}

// Calculate button click handler
document.getElementById('calculateBtn').addEventListener('click', function() {
    const startDay = document.getElementById('startDay').value;
    const startMonth = document.getElementById('startMonth').value;
    const startYear = document.getElementById('startYear').value;
    
    const endDay = document.getElementById('endDay').value;
    const endMonth = document.getElementById('endMonth').value;
    const endYear = document.getElementById('endYear').value;
    
    const resultContainer = document.getElementById('result');
    const resultText = document.getElementById('resultText');
    
    // Validate inputs
    if (!startDay || !startMonth || !startYear || !endDay || !endMonth || !endYear) {
        resultText.textContent = 'Please fill in all fields!';
        resultContainer.classList.add('show');
        return;
    }
    
    // Validate dates
    if (!isValidDate(startDay, startMonth, startYear)) {
        resultText.textContent = 'Invalid start date!';
        resultContainer.classList.add('show');
        return;
    }
    
    if (!isValidDate(endDay, endMonth, endYear)) {
        resultText.textContent = 'Invalid end date!';
        resultContainer.classList.add('show');
        return;
    }
    
    // Calculate difference
    const diff = calculateDateDifference(
        parseInt(startDay), 
        parseInt(startMonth), 
        parseInt(startYear), 
        parseInt(endDay), 
        parseInt(endMonth), 
        parseInt(endYear)
    );
    const formattedResult = formatResult(diff);
    
    // Show result with animation
    resultText.textContent = formattedResult;
    resultContainer.classList.remove('show');
    
    // Trigger animation
    setTimeout(() => {
        resultContainer.classList.add('show');
    }, 10);
});

// Allow Enter key to trigger calculation
const selects = document.querySelectorAll('select');
selects.forEach(select => {
    select.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('calculateBtn').click();
        }
    });
});

// Update watch hands to show current time
function updateWatchHands() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Calculate rotation angles
    // Hour hand: 30 degrees per hour + 0.5 degrees per minute
    const hourAngle = (hours * 30) + (minutes * 0.5);
    // Minute hand: 6 degrees per minute + 0.1 degrees per second
    const minuteAngle = (minutes * 6) + (seconds * 0.1);
    // Second hand: 6 degrees per second
    const secondAngle = seconds * 6;
    
    // Update the hands
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');
    
    if (hourHand) {
        hourHand.style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
    }
    if (minuteHand) {
        minuteHand.style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
    }
    if (secondHand) {
        secondHand.style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;
    }
}

// Update watch hands immediately and then every second
updateWatchHands();
setInterval(updateWatchHands, 1000);

// Update date and time display
function updateDateTime() {
    const now = new Date();
    
    // Format date
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('en-US', options);
    
    // Format time
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    const dateElement = document.getElementById('currentDate');
    const timeElement = document.getElementById('currentTime');
    
    if (dateElement) {
        dateElement.textContent = dateString;
    }
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Update date and time immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);
