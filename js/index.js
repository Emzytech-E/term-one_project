    // Visitor Counter
    let visitorCount = localStorage.getItem('visitorCount');
    if (!visitorCount) {
        visitorCount = 0;
    }
    visitorCount++;
    localStorage.setItem('visitorCount', visitorCount);
    document.getElementById('visitors').textContent = visitorCount;

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active menu item
                document.querySelectorAll('.menu li a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close mobile menu if open
                if (menu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    menu.classList.remove('active');
                }
            }
        });
    });

    // Ticker Date, Time and Location
    function updateDateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('current-date').textContent = now.toLocaleDateString(undefined, options);
        document.getElementById('current-time').textContent = now.toLocaleTimeString();
    }

    setInterval(updateDateTime, 1000);
    updateDateTime();

    // Geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // Reverse geocoding would typically be done with a service like Google Maps API
                // For demo purposes, we'll just show coordinates
                document.getElementById('user-location').textContent = `${latitude.toFixed(2)}° N, ${longitude.toFixed(2)}° E`;
            },
            error => {
                document.getElementById('user-location').textContent = 'Location permission denied';
            }
        );
    } else {
        document.getElementById('user-location').textContent = 'Geolocation not supported';
    }

    // Modal Functions
    function openModal(festivalName) {
        const modal = document.getElementById('festival-modal');
        const modalTitle = document.getElementById('modal-title');
        
        // Set festival name
        modalTitle.textContent = festivalName;
        
        // In a real application, you would fetch festival details from a database
        // For demo purposes, we'll use placeholder text
        const festivalData = {
            'Diwali': {
                description: 'Diwali, the festival of lights, is one of the most popular festivals of Hinduism. It symbolizes the spiritual "victory of light over darkness, good over evil, and knowledge over ignorance".',
                history: 'The festival is widely associated with Lakshmi, goddess of prosperity, and marks the return of Lord Rama to Ayodhya after defeating Ravana. Many also celebrate it as the day Lord Krishna defeated the demon Narakasura.',
                celebration: 'Houses are decorated with diyas (oil lamps) and rangoli patterns. People wear new clothes, light fireworks, and share sweets with family and friends.'
            },
            'Christmas': {
                description: 'Christmas is an annual festival commemorating the birth of Jesus Christ, observed primarily on December 25 as a religious and cultural celebration among billions of people around the world.',
                history: 'The first recorded Christmas celebration was in Rome in 336 AD. The date was chosen to coincide with pagan winter solstice festivals. The modern Christmas emerged during the 19th century.',
                celebration: 'Traditions include gift-giving, Christmas cards, carol singing, church services, and special meals. Decorations include Christmas trees, lights, nativity scenes, and holly.'
            },
            'Eid al-Fitr': {
                description: 'Eid al-Fitr is the earlier of the two official holidays celebrated within Islam. It marks the end of the month-long dawn-to-sunset fasting of Ramadan.',
                history: 'The holiday was established by the Islamic prophet Muhammad. It is a day of showing gratitude to God and giving to the poor and needy.',
                celebration: 'The day begins with a special prayer service in mosques. People wear their best clothes, decorate their homes, and visit family and friends. Special foods are prepared and gifts are given.'
            },
            'Holi': {
                description: 'Holi is a popular ancient Hindu festival, also known as the "Festival of Love", the "Festival of Colors" and the "Festival of Spring".',
                history: 'The festival celebrates the eternal and divine love of Radha Krishna. It also signifies the triumph of good over evil, commemorating the victory of Vishnu as Narasimha over Hiranyakashipu.',
                celebration: 'People throw colored powder and water at each other, dance to music, share festive foods and drinks. Bonfires are lit the night before to signify the burning of evil spirits.'
            }
        };
        
        const festivalInfo = festivalData[festivalName] || {
            description: 'This festival is celebrated with great enthusiasm around the world. It represents important cultural and religious values for the communities that observe it.',
            history: 'The origins of this festival date back centuries and are rooted in important historical events and traditions that have been passed down through generations.',
            celebration: 'People celebrate this festival with various customs that may include special foods, decorations, religious observances, and community gatherings.'
        };
        
        document.getElementById('festival-description').textContent = festivalInfo.description;
        document.getElementById('festival-history').textContent = festivalInfo.history;
        document.getElementById('festival-celebration').textContent = festivalInfo.celebration;
        
        // Update images in modal (in a real app, these would be specific to the festival)
        const festivalImages = document.querySelectorAll('.festival-image');
        festivalImages.forEach((img, index) => {
            img.src = `https://source.unsplash.com/random/300x200/?${encodeURIComponent(festivalName.toLowerCase())},${index}`;
            img.alt = `${festivalName} Image ${index + 1}`;
        });
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const modal = document.getElementById('festival-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function downloadFestivalInfo() {
        const festivalName = document.getElementById('modal-title').textContent;
        const description = document.getElementById('festival-description').textContent;
        const history = document.getElementById('festival-history').textContent;
        const celebration = document.getElementById('festival-celebration').textContent;
        
        const content = `
            ${festivalName}
            ================
            
            About the Festival:
            ${description}
            
            Historical Significance:
            ${history}
            
            Celebration Details:
            ${celebration}
            
            Source: World Festival Portal
        `;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${festivalName.replace(/\s+/g, '_')}_info.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('festival-modal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Filter functionality
    document.getElementById('religion-filter').addEventListener('change', applyFilters);
    document.getElementById('month-filter').addEventListener('change', applyFilters);
    document.getElementById('country-filter').addEventListener('change', applyFilters);

    function applyFilters() {
        // In a real application, this would filter the displayed festivals
        // For demo purposes, we'll just show an alert
        const religion = document.getElementById('religion-filter').value;
        const month = document.getElementById('month-filter').value;
        const country = document.getElementById('country-filter').value;
        
        if (religion !== 'all' || month !== 'all' || country !== 'all') {
            alert(`Filters applied:\nReligion: ${religion}\nMonth: ${month}\nCountry: ${country}`);
        }
    }

    // Form submission
    document.querySelector('.feedback-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your feedback!');
        e.target.reset();
    });