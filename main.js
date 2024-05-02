fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const publicIp = data.ip;
            document.getElementById('public-ip').textContent = publicIp;
            document.getElementById('title').textContent = publicIp;
            })
        .catch(error => console.error('Error fetching IP address:', error));

