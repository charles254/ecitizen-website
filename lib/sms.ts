// lib/sms.ts

// server-hoist-static-io: Read env vars once at module level
const AT_USERNAME = process.env.AT_USERNAME;
const AT_API_KEY = process.env.AT_API_KEY;
const AT_FROM = process.env.AT_FROM || "ECITIZEN";
const AT_URL = 'https://api.africastalking.com/version1/messaging';

export async function sendSMS(to: string, message: string) {
    const username = AT_USERNAME;
    const apiKey = AT_API_KEY;
    const from = AT_FROM;

    // Normalize and validate Kenyan phone number
    let formattedPhone = to.replace(/\s+/g, '');
    if (formattedPhone.startsWith('0')) {
        formattedPhone = '+254' + formattedPhone.slice(1);
    } else if (formattedPhone.startsWith('254')) {
        formattedPhone = '+' + formattedPhone;
    } else if (!formattedPhone.startsWith('+254')) {
        return { success: false, error: 'Invalid phone number format' };
    }

    // Strict validation: must be +254 followed by 9 digits
    if (!/^\+254[17]\d{8}$/.test(formattedPhone)) {
        return { success: false, error: 'Invalid Kenyan phone number' };
    }

    const url = AT_URL;

    const body = new URLSearchParams({
        username: username!,
        to: formattedPhone,
        message: message,
        from: from
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'apikey': apiKey!
            },
            body: body.toString()
        });

        const data = await response.json();
        console.log('SMS Send Result:', data);
        return { success: true, data };
    } catch (error) {
        console.error('SMS Send Error:', error);
        return { success: false, error };
    }
}
