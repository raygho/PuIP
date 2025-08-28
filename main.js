
const ipServices = [
    {
        url: 'https://api.ipify.org?format=json',
        extractIp: (data) => data.ip
    },
    {
        url: 'https://ipapi.co/json/',
        extractIp: (data) => data.ip
    },
    {
        url: 'https://api.my-ip.io/ip.json',
        extractIp: (data) => data.ip
    },
    {
        url: 'https://httpbin.org/ip',
        extractIp: (data) => data.origin
    },
    {
        url: 'https://api.seeip.org/jsonip',
        extractIp: (data) => data.ip
    }
];

async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, { 
            signal: controller.signal,
            headers: {
                'Accept': 'application/json'
            }
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

async function getPublicIP() {
    let lastError = null;
    
    for (let i = 0; i < ipServices.length; i++) {
        const service = ipServices[i];
        
        try {
            console.log(`Trying service ${i + 1}/${ipServices.length}: ${service.url}`);
            const data = await fetchWithTimeout(service.url);
            const ip = service.extractIp(data);
            
            if (ip && typeof ip === 'string' && ip.trim()) {
                console.log(`Successfully got IP from service ${i + 1}: ${ip}`);
                return ip.trim();
            } else {
                throw new Error('Invalid IP format received');
            }
        } catch (error) {
            console.warn(`Service ${i + 1} failed:`, error.message);
            lastError = error;
            
            if (i < ipServices.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
    }
    
    throw new Error(`All IP services failed. Last error: ${lastError?.message || 'Unknown error'}`);
}

function updateUI(ip) {
    const ipElement = document.getElementById('public-ip');
    const retryBtn = document.getElementById('retry-btn');
    
    ipElement.textContent = ip;
    ipElement.style.color = '#51cf66';
    ipElement.className = 'success';
    document.getElementById('title').textContent = ip;
    if (retryBtn) {
        retryBtn.style.display = 'none';
    }
}

function showError(error) {
    console.error('Error fetching IP address:', error);
    const ipElement = document.getElementById('public-ip');
    const retryBtn = document.getElementById('retry-btn');
    
    ipElement.textContent = 'Unable to fetch IP';
    ipElement.style.color = '#ff6b6b';
    ipElement.className = 'error';
    ipElement.title = `Error: ${error.message}`;
    document.getElementById('title').textContent = 'IP Fetch Failed';
    if (retryBtn) {
        retryBtn.style.display = 'inline-block';
    }
}

function showLoading() {
    const ipElement = document.getElementById('public-ip');
    const retryBtn = document.getElementById('retry-btn');
    
    ipElement.textContent = 'Loading...';
    ipElement.style.color = 'white';
    ipElement.className = '';
    ipElement.title = '';
    document.getElementById('title').textContent = 'Loading...';
    if (retryBtn) {
        retryBtn.style.display = 'none';
    }
}

async function main() {
    showLoading();
    
    try {
        const ip = await getPublicIP();
        updateUI(ip);
    } catch (error) {
        showError(error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    main();
    
    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
        retryBtn.addEventListener('click', main);
    }
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
            event.preventDefault();
            main();
        }
    });
});

if (document.readyState === 'loading') {
} else {
    main();
    
    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
        retryBtn.addEventListener('click', main);
    }
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
            event.preventDefault();
            main();
        }
    });
}
