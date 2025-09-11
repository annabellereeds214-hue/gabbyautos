document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements & Mobile Navigation ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    // --- Page Detection ---
    const isShowroomPage = window.location.pathname.includes('showroom.html');
    const isExoticFleetPage = window.location.pathname.includes('exotic-fleet.html');
    const isVehicleDetailsPage = window.location.pathname.includes('vehicle-details.html');
    const isDepositPage = window.location.pathname.includes('deposit.html');
    const isTrackingPage = window.location.pathname.includes('tracking.html');
    const isFaqPage = window.location.pathname.includes('faq.html');

    let allCars = []; // To store all fetched car data

    // --- Fetch Car Data (Centralized) ---
    async function fetchCars() {
        try {
            const response = await fetch('data/cars.json');
            if (!response.ok) {
                // Improved error message for network/path issues
                throw new Error(`HTTP error! Status: ${response.status} - Check 'data/cars.json' path and if a local server is running.`);
            }
            allCars = await response.json();

            // Initialize page-specific logic AFTER fetching cars
            if (isShowroomPage || isExoticFleetPage) {
                initCarListingPage();
            } else if (isVehicleDetailsPage) {
                displayVehicleDetails();
            } else if (isDepositPage) {
                initDepositPage();
            } else if (isTrackingPage) { // Initialize tracking page logic
                initTrackingPage();
            }

        } catch (error) {
            console.error('Could not fetch car data:', error);
            // Display specific error messages on relevant pages
            if (isShowroomPage || isExoticFleetPage) {
                const carResultsContainer = document.getElementById('car-results');
                if (carResultsContainer) carResultsContainer.innerHTML = '<p style="text-align: center; color: red;">Failed to load car data. Please ensure "data/cars.json" exists and a local server is running. Error: ' + error.message + '</p>';
            } else if (isVehicleDetailsPage) {
                const loadingMessage = document.querySelector('.loading-message');
                const errorMessage = document.querySelector('.error-message');
                if (loadingMessage) loadingMessage.style.display = 'none';
                if (errorMessage) {
                    errorMessage.textContent = 'Failed to load vehicle details. ' + error.message;
                    errorMessage.style.display = 'block';
                }
            } else if (isDepositPage) {
                const depositMessage = document.getElementById('deposit-message');
                if (depositMessage) {
                    depositMessage.textContent = 'Failed to load vehicle data for deposit. ' + error.message;
                    depositMessage.classList.add('error');
                    depositMessage.style.display = 'block';
                }
            } else if (isTrackingPage) { // Added error handling for tracking page
                const trackingResults = document.getElementById('tracking-results');
                if (trackingResults) {
                    trackingResults.innerHTML = '<p style="text-align: center; color: red;">Cannot track without car data. ' + error.message + '</p>';
                }
            }
        }
    }

    // --- Showroom/Exotic Fleet Logic ---
    function initCarListingPage() {
        const carResultsContainer = document.getElementById('car-results');
        const noResultsMessage = document.querySelector('.no-results-message');
        const makeFilter = document.getElementById('make-filter');
        const typeFilter = document.getElementById('type-filter');
        const minPriceInput = document.getElementById('min-price');
        const maxPriceInput = document.getElementById('max-price');
        const conditionFilter = document.getElementById('condition-filter');
        const applyFiltersBtn = document.getElementById('apply-filters');
        const clearFiltersBtn = document.getElementById('clear-filters');

        populateMakeFilter(allCars, makeFilter, isExoticFleetPage);
        applyFilters(allCars, carResultsContainer, noResultsMessage, makeFilter, typeFilter, minPriceInput, maxPriceInput, conditionFilter, isExoticFleetPage);

        if (applyFiltersBtn && clearFiltersBtn) {
            applyFiltersBtn.addEventListener('click', () => applyFilters(allCars, carResultsContainer, noResultsMessage, makeFilter, typeFilter, minPriceInput, maxPriceInput, conditionFilter, isExoticFleetPage));
            clearFiltersBtn.addEventListener('click', () => clearFilters(makeFilter, typeFilter, minPriceInput, maxPriceInput, conditionFilter, () => applyFilters(allCars, carResultsContainer, noResultsMessage, makeFilter, typeFilter, minPriceInput, maxPriceInput, conditionFilter, isExoticFleetPage)));
        }
    }

    function populateMakeFilter(cars, makeFilterElement, isExotic) {
        if (!makeFilterElement) return;

        const carsForMakes = isExotic ? cars.filter(car => car.isExotic) : cars;
        const makes = [...new Set(carsForMakes.map(car => car.make))].sort();

        while (makeFilterElement.options.length > 1) {
            makeFilterElement.remove(1);
        }

        makes.forEach(make => {
            const option = document.createElement('option');
            option.value = make;
            option.textContent = make;
            makeFilterElement.appendChild(option);
        });
    }

    function displayCars(carsToDisplay, container, noResultsMsgElement) {
        if (!container) return;

        container.innerHTML = '';

        if (carsToDisplay.length === 0) {
            noResultsMsgElement.style.display = 'block';
            return;
        } else {
            noResultsMsgElement.style.display = 'none';
        }

        carsToDisplay.forEach(car => {
            const carCard = document.createElement('div');
            carCard.classList.add('vehicle-card');
            carCard.setAttribute('data-scrollcue', 'true');
            carCard.setAttribute('data-effect', 'fadeInUp');

            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.make} ${car.model}">
                <h3>${car.make} ${car.model}</h3>
                <p>Year: ${car.year} | Type: ${car.type}</p>
                <p>Price: $${car.price.toLocaleString()}</p>
                <a href="vehicle-details.html?id=${car.id}" class="btn btn-secondary">View Details</a>
            `;
            container.appendChild(carCard);
        });

        if (typeof scrollCue !== 'undefined') {
            scrollCue.update();
        }
    }

    function applyFilters(cars, container, noResultsMsgElement, makeFilterElement, typeFilterElement, minPriceInput, maxPriceInput, conditionFilterElement, isExotic) {
        let filteredCars = [...cars];

        if (isExotic) {
            filteredCars = filteredCars.filter(car => car.isExotic);
        }

        const selectedMake = makeFilterElement ? makeFilterElement.value : '';
        const selectedType = typeFilterElement ? typeFilterElement.value : '';
        const minPrice = minPriceInput ? parseFloat(minPriceInput.value) : 0;
        const maxPrice = maxPriceInput ? parseFloat(maxPriceInput.value) : Infinity;
        const selectedCondition = conditionFilterElement ? conditionFilterElement.value : '';

        if (selectedMake) {
            filteredCars = filteredCars.filter(car => car.make === selectedMake);
        }
        if (selectedType) {
            filteredCars = filteredCars.filter(car => car.type === selectedType);
        }
        if (minPrice) {
            filteredCars = filteredCars.filter(car => car.price >= minPrice);
        }
        if (maxPrice) {
            filteredCars = filteredCars.filter(car => car.price <= maxPrice);
        }
        if (selectedCondition) {
            filteredCars = filteredCars.filter(car => car.condition === selectedCondition);
        }

        displayCars(filteredCars, container, noResultsMsgElement);
    }

    function clearFilters(makeFilterElement, typeFilterElement, minPriceInput, maxPriceInput, conditionFilterElement, callback) {
        if (makeFilterElement) makeFilterElement.value = '';
        if (typeFilterElement) typeFilterElement.value = '';
        if (minPriceInput) minPriceInput.value = '100000'; // Assuming default values
        if (maxPriceInput) maxPriceInput.value = '1000000'; // Assuming default values
        if (conditionFilterElement) conditionFilterElement.value = '';
        callback();
    }

    // --- Vehicle Details Page Logic ---
    function displayVehicleDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const carId = urlParams.get('id');
        const vehicle = allCars.find(c => c.id === carId);

        const detailContainer = document.getElementById('vehicle-details-container');
        const titleElement = document.getElementById('vehicle-detail-title');
        const subtitleElement = document.getElementById('vehicle-detail-subtitle');

        if (!detailContainer || !titleElement || !subtitleElement) return;

        const loadingMessage = document.querySelector('.loading-message');
        const errorMessage = document.querySelector('.error-message');
        if (loadingMessage) loadingMessage.style.display = 'none';

        if (vehicle) {
            titleElement.textContent = `${vehicle.make} ${vehicle.model}`;
            subtitleElement.textContent = `Year: ${vehicle.year} | Type: ${vehicle.type}`;

            detailContainer.innerHTML = `
                <div class="vehicle-image-gallery">
                    <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" class="main-image" data-scrollcue="true" data-effect="fadeIn">
                    </div>
                <div class="vehicle-info" data-scrollcue="true" data-effect="fadeInUp">
                    <h2>${vehicle.make} ${vehicle.model}</h2>
                    <p class="price">$${vehicle.price.toLocaleString()}</p>

                    <div class="vehicle-specs">
                        <h3>Specifications</h3>
                        <ul>
                            <li><strong>Year:</strong> ${vehicle.year}</li>
                            <li><strong>Condition:</strong> ${vehicle.condition}</li>
                            <li><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()} miles</li>
                            <li><strong>Engine:</strong> ${vehicle.engine}</li>
                            <li><strong>Transmission:</strong> ${vehicle.transmission}</li>
                            <li><strong>Fuel Type:</strong> ${vehicle.fuelType}</li>
                            <li><strong>Exterior Color:</strong> ${vehicle.color}</li>
                            <li><strong>Interior Color:</strong> ${vehicle.interiorColor}</li>
                        </ul>
                    </div>

                    <p class="vehicle-description">${vehicle.description}</p>

                    <div class="vehicle-features">
                        <h3>Key Features</h3>
                        <ul>
                            ${vehicle.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>

                    <a href="deposit.html?carId=${vehicle.id}&price=${vehicle.price}&name=${encodeURIComponent(vehicle.make + ' ' + vehicle.model)}" class="btn btn-primary">Make Deposit for This Vehicle</a>
                </div>
            `;
            if (typeof scrollCue !== 'undefined') {
                scrollCue.update();
            }
        } else {
            titleElement.textContent = 'Vehicle Not Found';
            subtitleElement.textContent = 'The requested vehicle could not be loaded.';
            if (errorMessage) errorMessage.style.display = 'block';
        }
    }

    // --- Deposit Page Logic ---
    function initDepositPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const carId = urlParams.get('carId');
        const carPrice = urlParams.get('price');
        const carName = urlParams.get('name');

        const carNameInput = document.getElementById('car-name');
        const carIdInput = document.getElementById('car-id');
        const carPriceInput = document.getElementById('car-price');
        const depositAmountInput = document.getElementById('deposit-amount');
        const paymentMethodSelect = document.getElementById('payment-method');
        const cryptoDetailsDiv = document.getElementById('crypto-details');
        const paypalDetailsDiv = document.getElementById('paypal-details');
        const walletAddressSpan = document.getElementById('wallet-address');
        const cryptoNetworkSpan = document.getElementById('crypto-network');
        const depositForm = document.getElementById('deposit-form');
        const depositMessage = document.getElementById('deposit-message');
        const copyButtons = document.querySelectorAll('.copy-btn');

        if (carId && carPrice && carName) {
            carNameInput.value = decodeURIComponent(carName);
            carIdInput.value = carId;
            carPriceInput.value = `$${parseFloat(carPrice).toLocaleString()}`;
            const suggestedDeposit = Math.max(1000, parseFloat(carPrice) * 0.05);
            depositAmountInput.value = Math.round(suggestedDeposit);
            depositAmountInput.min = 1000;
        } else {
            carNameInput.value = 'No specific vehicle selected';
            carPriceInput.value = 'N/A';
            depositAmountInput.value = 1000;
        }

        paymentMethodSelect.addEventListener('change', () => {
            cryptoDetailsDiv.style.display = 'none';
            paypalDetailsDiv.style.display = 'none';
            depositMessage.style.display = 'none';

            const selectedMethod = paymentMethodSelect.value;
            if (selectedMethod === 'paypal') {
                paypalDetailsDiv.style.display = 'block';
            } else if (selectedMethod.includes('crypto')) { // Catch-all for any crypto options
                cryptoDetailsDiv.style.display = 'block';
                const cryptoAddresses = {
                    'bitcoin': { address: 'bc1qxyz123abc456def789ghi0jklmno', network: 'Bitcoin Network' },
                    'ethereum': { address: '0xAbC123DeF456GhI789JkL012MnOpQ', network: 'ERC-20' },
                    'litecoin': { address: 'ltc1qabc123def456ghi789jklmno', network: 'Litecoin Network' },
                    'cardano': { address: 'addr1q9876543210fedcba9876543210fedcb', network: 'Cardano Network' },
                    'solana': { address: 'SoL4nAGsWn7G23P9F123456789ABCDEF', network: 'Solana Network' }
                };
                const chosenCrypto = cryptoAddresses[selectedMethod];
                if (chosenCrypto) {
                    walletAddressSpan.textContent = chosenCrypto.address;
                    cryptoNetworkSpan.textContent = chosenCrypto.network;
                } else {
                    walletAddressSpan.textContent = 'Please select a specific cryptocurrency.';
                    cryptoNetworkSpan.textContent = '';
                }
            }
        });

        // Copy to clipboard functionality for crypto addresses
        copyButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const targetId = button.dataset.target;
                const textToCopy = document.getElementById(targetId).textContent;
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                    alert('Failed to copy. Please copy manually.');
                }
            });
        });

        // Form submission for deposit
        if (depositForm) {
            depositForm.addEventListener('submit', (e) => {
                e.preventDefault();
                depositMessage.style.display = 'block';
                depositMessage.classList.remove('success', 'error');

                const depositAmount = parseFloat(depositAmountInput.value);
                const paymentMethod = paymentMethodSelect.value;
                const customerName = document.getElementById('customer-name').value;
                const customerEmail = document.getElementById('customer-email').value;

                if (!customerName || !customerEmail || !depositAmount || paymentMethod === '') {
                    depositMessage.textContent = 'Please fill in all required fields (Name, Email, Deposit Amount) and select a payment method.';
                    depositMessage.classList.add('error');
                    return;
                }

                if (depositAmount < parseFloat(depositAmountInput.min)) {
                    depositMessage.textContent = `Deposit amount must be at least $${depositAmountInput.min}.`;
                    depositMessage.classList.add('error');
                    return;
                }

                // Simulate backend interaction
                // In a real application, you'd send this data to a server
                console.log('Deposit Submission:', {
                    carId: carIdInput.value,
                    carName: carNameInput.value,
                    depositAmount: depositAmount,
                    paymentMethod: paymentMethod,
                    customerName: customerName,
                    customerEmail: customerEmail
                });

                // Simulate success
                depositMessage.textContent = `Thank you, ${customerName}! Your deposit of $${depositAmount.toLocaleString()} via ${paymentMethod} for ${carNameInput.value} has been received (simulated). You will receive a confirmation email shortly.`;
                depositMessage.classList.add('success');
                depositForm.reset(); // Clear form on successful submission
                cryptoDetailsDiv.style.display = 'none'; // Hide crypto details after submit
                paypalDetailsDiv.style.display = 'none'; // Hide PayPal details after submit

                // Redirect to tracking page or show tracking info (simulated)
                // For this example, let's just show a simulated tracking ID
                const simulatedTrackingId = 'TRK-' + Math.random().toString(36).substring(2, 11).toUpperCase();
                depositMessage.innerHTML += `<p>Your simulated tracking ID is: <strong>${simulatedTrackingId}</strong>. You can use this on the <a href="tracking.html?id=${simulatedTrackingId}">Tracking Page</a>.</p>`;

                // Optionally, store the tracking ID in sessionStorage for the tracking page
                sessionStorage.setItem('lastTrackingId', simulatedTrackingId);
                sessionStorage.setItem(simulatedTrackingId, JSON.stringify({
                    carName: carNameInput.value,
                    depositAmount: depositAmount,
                    status: 'Deposit Confirmed',
                    date: new Date().toLocaleDateString()
                }));
            });
        }
    }

    // --- Tracking Page Logic (NEW) ---
    function initTrackingPage() {
        const trackingForm = document.getElementById('tracking-form');
        const trackingIdInput = document.getElementById('tracking-id-input');
        const trackingResultsDiv = document.getElementById('tracking-results');

        if (!trackingForm || !trackingIdInput || !trackingResultsDiv) {
            console.warn('Tracking page elements not found. Ensure tracking-form, tracking-id-input, and tracking-results exist.');
            return;
        }

        // Try to pre-fill from session storage if redirected from deposit
        const lastTrackingId = sessionStorage.getItem('lastTrackingId');
        if (lastTrackingId) {
            trackingIdInput.value = lastTrackingId;
            displayTrackingStatus(lastTrackingId, trackingResultsDiv);
            sessionStorage.removeItem('lastTrackingId'); // Clean up after use
        } else {
            // Check URL parameters for tracking ID
            const urlParams = new URLSearchParams(window.location.search);
            const urlTrackingId = urlParams.get('id');
            if (urlTrackingId) {
                trackingIdInput.value = urlTrackingId;
                displayTrackingStatus(urlTrackingId, trackingResultsDiv);
            }
        }


        trackingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const enteredTrackingId = trackingIdInput.value.trim().toUpperCase();
            if (enteredTrackingId) {
                displayTrackingStatus(enteredTrackingId, trackingResultsDiv);
            } else {
                trackingResultsDiv.innerHTML = '<p class="error-message">Please enter a tracking ID.</p>';
            }
        });
    }

    function displayTrackingStatus(trackingId, resultsContainer) {
        // In a real app, this would fetch from a backend API
        // For simulation, we retrieve from sessionStorage
        const storedInfo = sessionStorage.getItem(trackingId);

        resultsContainer.innerHTML = ''; // Clear previous results

        if (storedInfo) {
            try {
                const orderData = JSON.parse(storedInfo);
                resultsContainer.innerHTML = `
                    <div class="tracking-info-card">
                        <h3>Tracking ID: ${trackingId}</h3>
                        <p><strong>Vehicle:</strong> ${orderData.carName}</p>
                        <p><strong>Deposit Amount:</strong> $${orderData.depositAmount.toLocaleString()}</p>
                        <p><strong>Status:</strong> <span class="status-badge status-${orderData.status.toLowerCase().replace(/\s/g, '-')}">${orderData.status}</span></p>
                        <p><strong>Date:</strong> ${orderData.date}</p>
                        <p>Your vehicle is currently in the "Deposit Confirmed" phase. Our team will contact you shortly to finalize details and arrange the next steps.</p>
                        </div>
                `;
            } catch (e) {
                console.error("Error parsing stored tracking data:", e);
                resultsContainer.innerHTML = '<p class="error-message">Error retrieving tracking information. Data corrupted.</p>';
            }
        } else {
            resultsContainer.innerHTML = '<p class="error-message">No tracking information found for this ID. Please check the ID and try again.</p>';
        }
    }


    // --- General Call to Fetch Cars ---
    // This will initiate the fetching process once the DOM is ready.
    fetchCars();

    // --- FAQ Page Accordion (NEW) ---
    if (isFaqPage) {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-question');
            header.addEventListener('click', () => {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
                const answer = item.querySelector('.faq-answer');
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = null;
                }
            });
        });
    }

}); // End DOMContentLoaded