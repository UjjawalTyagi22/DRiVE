const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const API_URL = process.env.BACKEND_URL || 'http://localhost:5000/api';

async function runSecurityChecks() {
    console.log('🔍 Starting Security Verification Checks...\n');
    let testEmail = `test_${Date.now()}@example.com`;
    let token;

    try {
        // 1. Test Registration Validation
        console.log('1. Testing Registration Validation...');
        try {
            await axios.post(`${API_URL}/auth/register`, {
                firstName: 'Test',
                lastName: 'User',
                email: 'invalid-email',
                password: '123',
                phone: 'abc' // Invalid phone
            });
            console.log('❌ FAIL: Accepted invalid email/password/phone');
        } catch (error) {
            console.log('✅ PASS: Rejected invalid registration data (Email/Password/Phone)');
        }

        // 2. Register valid user
        console.log('\n2. Registering valid user...');
        const regRes = await axios.post(`${API_URL}/auth/register`, {
            firstName: 'Security',
            lastName: 'Test',
            email: testEmail,
            password: 'password123'
        });
        token = regRes.data.data.token;
        console.log('✅ PASS: User registered successfully');

        // 3. Test Privilege Escalation via updateProfile
        console.log('\n3. Testing Privilege Escalation...');
        const updateRes = await axios.put(`${API_URL}/users/profile`, {
            role: 'Admin',
            totalPoints: 999999,
            firstName: 'Hacker'
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const user = updateRes.data.data.user;
        if (user.role === 'Admin' || user.totalPoints === 999999) {
            console.log('❌ FAIL: Privilege escalation successful!');
            console.log(`Current Role: ${user.role}, Points: ${user.totalPoints}`);
        } else {
            console.log('✅ PASS: Privilege escalation blocked. Role and points remained unchanged.');
            console.log(`Updated Name: ${user.firstName} (Expected: Hacker)`);
        }

        console.log('\n✨ Security checks completed successfully!');
    } catch (error) {
        console.error('\n❌ Error during security checks:', error.response?.data || error.message);
        console.log('\nMake sure the backend is running before running this test.');
    }
}

runSecurityChecks();
