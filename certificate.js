document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('nameForm');
    const downloadButton = document.querySelector('.download-button');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        generateCertificate();
    });

    downloadButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default button action
        generateCertificate();
    });

    async function generateCertificate() {
        const userName = document.getElementById('userName').value.trim();
        if (!userName) {
            alert('Please enter your name.');
            return;
        }

        // Update recipient name in certificate
        const recipientNameElement = document.getElementById('recipientName');
        recipientNameElement.textContent = userName;

        // Set completion date
        const completionDateElement = document.getElementById('completionDate');
        completionDateElement.textContent = formatDate(new Date());

        // Generate PNG certificate
        await generatePNG();
    }

    async function generatePNG() {
        const certificateContainer = document.querySelector('.border-pattern');

        try {
            // Use html2canvas to render the certificate container as a canvas
            const canvas = await html2canvas(certificateContainer);

            // Convert canvas to PNG image data URL
            const imageData = canvas.toDataURL('image/png');

            // Create a link element to trigger download
            const link = document.createElement('a');
            link.href = imageData;
            link.download = 'Certificate_of_Completion.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error generating the certificate:', error);
        }
    }

    function formatDate(date) {
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        const suffix = nth(day);
        return `${day}${suffix} ${month} ${year}`;
    }

    function nth(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }
});
