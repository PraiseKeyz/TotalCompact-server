const axios = require('axios');
const { generateApiToken } = require('./generate-api-token.js');

// Configuration
const BASE_URL = 'http://localhost:3000/api/v1';
const CONTACT_ENDPOINT = `${BASE_URL}/contact`;

// Generate API token for testing
const apiToken = generateApiToken('test-admin', 'admin');

// Test data
const testContact = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  subject: "Project Inquiry",
  message: "I'm interested in your construction services and would like to discuss a potential project."
};

const testContact2 = {
  name: "Jane Smith",
  email: "jane.smith@example.com",
  phone: "+1987654321",
  subject: "General Inquiry",
  message: "I have a question about your services and pricing."
};

// Headers with authentication
const authHeaders = {
  'Authorization': `Bearer ${apiToken}`,
  'Content-Type': 'application/json'
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Helper function to log responses
const logResponse = (title, response, error = null) => {
  console.log(`\n${colors.bold}${colors.blue}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.bold}${colors.yellow}${title}${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}${'='.repeat(60)}${colors.reset}`);
  
  if (error) {
    console.log(`${colors.red}❌ ERROR:${colors.reset}`);
    console.log(`${colors.red}Status: ${error.response?.status || 'Network Error'}${colors.reset}`);
    console.log(`${colors.red}Message: ${error.message}${colors.reset}`);
    if (error.response?.data) {
      console.log(`${colors.red}Response Data:${colors.reset}`);
      console.log(JSON.stringify(error.response.data, null, 2));
    }
  } else {
    console.log(`${colors.green}✅ SUCCESS:${colors.reset}`);
    console.log(`${colors.green}Status: ${response.status}${colors.reset}`);
    console.log(`${colors.green}Status Text: ${response.statusText}${colors.reset}`);
    console.log(`${colors.green}Headers:${colors.reset}`);
    console.log(JSON.stringify(response.headers, null, 2));
    console.log(`${colors.green}Response Data:${colors.reset}`);
    console.log(JSON.stringify(response.data, null, 2));
  }
  console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}\n`);
};

// Test functions
const testCreateContact = async (contactData, testName = "CREATE Contact") => {
  try {
    console.log(`${colors.bold}${colors.yellow}🔄 Testing ${testName}...${colors.reset}`);
    const response = await axios.post(CONTACT_ENDPOINT, contactData);
    logResponse(`${testName} - Success`, response);
    return response.data.data._id;
  } catch (error) {
    logResponse(`${testName} - Error`, null, error);
    return null;
  }
};

const testGetAllContacts = async () => {
  try {
    console.log(`${colors.bold}${colors.yellow}🔄 Testing GET All Contacts...${colors.reset}`);
    const response = await axios.get(CONTACT_ENDPOINT, { headers: authHeaders });
    logResponse('GET All Contacts - Success', response);
  } catch (error) {
    logResponse('GET All Contacts - Error', null, error);
  }
};

const testGetContactById = async (contactId) => {
  if (!contactId) {
    console.log(`${colors.red}❌ Skipping GET Contact by ID - No contact ID available${colors.reset}`);
    return;
  }
  
  try {
    console.log(`${colors.bold}${colors.yellow}🔄 Testing GET Contact by ID...${colors.reset}`);
    const response = await axios.get(`${CONTACT_ENDPOINT}/${contactId}`, { headers: authHeaders });
    logResponse('GET Contact by ID - Success', response);
  } catch (error) {
    logResponse('GET Contact by ID - Error', null, error);
  }
};

const testUpdateContactStatus = async (contactId, status = "In Progress") => {
  if (!contactId) {
    console.log(`${colors.red}❌ Skipping UPDATE Contact Status - No contact ID available${colors.reset}`);
    return;
  }
  
  try {
    console.log(`${colors.bold}${colors.yellow}🔄 Testing UPDATE Contact Status...${colors.reset}`);
    const response = await axios.patch(
      `${CONTACT_ENDPOINT}/${contactId}/status`, 
      { status },
      { headers: authHeaders }
    );
    logResponse('UPDATE Contact Status - Success', response);
  } catch (error) {
    logResponse('UPDATE Contact Status - Error', null, error);
  }
};

const testDeleteContact = async (contactId) => {
  if (!contactId) {
    console.log(`${colors.red}❌ Skipping DELETE Contact - No contact ID available${colors.reset}`);
    return;
  }
  
  try {
    console.log(`${colors.bold}${colors.yellow}🔄 Testing DELETE Contact...${colors.reset}`);
    const response = await axios.delete(`${CONTACT_ENDPOINT}/${contactId}`, { headers: authHeaders });
    logResponse('DELETE Contact - Success', response);
  } catch (error) {
    logResponse('DELETE Contact - Error', null, error);
  }
};

// Test error cases
const testErrorCases = async () => {
  console.log(`${colors.bold}${colors.yellow}🧪 Testing Error Cases...${colors.reset}`);
  
  // Test invalid contact data
  const invalidContact = {
    name: "", // Empty name
    email: "invalid-email", // Invalid email
    subject: "Test", // Missing required fields
    // Missing message
  };
  
  try {
    console.log(`${colors.bold}${colors.yellow}🔄 Testing Invalid Contact Data...${colors.reset}`);
    const response = await axios.post(CONTACT_ENDPOINT, invalidContact);
    logResponse('Invalid Contact Data - Unexpected Success', response);
  } catch (error) {
    logResponse('Invalid Contact Data - Expected Error', null, error);
  }
  
  // Test non-existent contact ID
  try {
    console.log(`${colors.bold}${colors.yellow}🔄 Testing Non-existent Contact ID...${colors.reset}`);
    const response = await axios.get(`${CONTACT_ENDPOINT}/507f1f77bcf86cd799439011`, { headers: authHeaders });
    logResponse('Non-existent Contact ID - Unexpected Success', response);
  } catch (error) {
    logResponse('Non-existent Contact ID - Expected Error', null, error);
  }
};

// Main test runner
const runAllTests = async () => {
  console.log(`${colors.bold}${colors.blue}🚀 Starting Contact API Tests with Authentication${colors.reset}`);
  console.log(`${colors.blue}Base URL: ${BASE_URL}${colors.reset}`);
  console.log(`${colors.blue}Contact Endpoint: ${CONTACT_ENDPOINT}${colors.reset}`);
  console.log(`${colors.blue}API Token: ${apiToken.substring(0, 20)}...${colors.reset}\n`);
  
  // Test 1: Create first contact
  const contactId1 = await testCreateContact(testContact, "CREATE Contact 1");
  
  // Test 2: Create second contact
  const contactId2 = await testCreateContact(testContact2, "CREATE Contact 2");
  
  // Test 3: Get All Contacts
  await testGetAllContacts();
  
  // Test 4: Get Contact by ID
  await testGetContactById(contactId1);
  
  // Test 5: Update Contact Status
  await testUpdateContactStatus(contactId1, "In Progress");
  await testUpdateContactStatus(contactId1, "Replied");
  await testUpdateContactStatus(contactId1, "Closed");
  
  // Test 6: Error cases
  await testErrorCases();
  
  // Test 7: Delete contacts
  await testDeleteContact(contactId1);
  await testDeleteContact(contactId2);
  
  console.log(`${colors.bold}${colors.green}✅ All Contact API Tests Completed!${colors.reset}`);
};

// Run the tests
runAllTests().catch(console.error); 