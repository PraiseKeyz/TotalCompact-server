const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3000/api/v1';
const CONTACT_ENDPOINT = `${BASE_URL}/contact`;

// Test data
const testContact = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  subject: "Project Inquiry",
  message: "I'm interested in your construction services and would like to discuss a potential project."
};

const updatedContact = {
  name: "Jane Smith",
  email: "jane.smith@example.com",
  phone: "+1987654321",
  subject: "Updated Project Inquiry",
  message: "This is an updated message for testing purposes."
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
  console.log(`\n${colors.bold}${colors.blue}${'='.repeat(50)}${colors.reset}`);
  console.log(`${colors.bold}${colors.yellow}${title}${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}${'='.repeat(50)}${colors.reset}`);
  
  if (error) {
    console.log(`${colors.red}❌ ERROR:${colors.reset}`);
    console.log(`${colors.red}Status: ${error.response?.status || 'Network Error'}${colors.reset}`);
    console.log(`${colors.red}Message: ${error.message}${colors.reset}`);
    if (error.response?.data) {
      console.log(`${colors.red}Response:${colors.reset}`);
      console.log(JSON.stringify(error.response.data, null, 2));
    }
  } else {
    console.log(`${colors.green}✅ SUCCESS:${colors.reset}`);
    console.log(`${colors.green}Status: ${response.status}${colors.reset}`);
    console.log(`${colors.green}Response:${colors.reset}`);
    console.log(JSON.stringify(response.data, null, 2));
  }
  console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}\n`);
};

// Test functions
const testCreateContact = async () => {
  try {
    console.log(`${colors.bold}${colors.yellow}🔄 Testing CREATE Contact...${colors.reset}`);
    const response = await axios.post(CONTACT_ENDPOINT, testContact);
    logResponse('CREATE Contact - Success', response);
    return response.data.data._id; // Return the created contact ID
  } catch (error) {
    logResponse('CREATE Contact - Error', null, error);
    return null;
  }
};

const testGetAllContacts = async () => {
  try {
    console.log(`${colors.bold}${colors.yellow}🔄 Testing GET All Contacts...${colors.reset}`);
    const response = await axios.get(CONTACT_ENDPOINT);
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
    const response = await axios.get(`${CONTACT_ENDPOINT}/${contactId}`);
    logResponse('GET Contact by ID - Success', response);
  } catch (error) {
    logResponse('GET Contact by ID - Error', null, error);
  }
};

const testUpdateContactStatus = async (contactId) => {
  if (!contactId) {
    console.log(`${colors.red}❌ Skipping UPDATE Contact Status - No contact ID available${colors.reset}`);
    return;
  }
  
  try {
    console.log(`${colors.bold}${colors.yellow}🔄 Testing UPDATE Contact Status...${colors.reset}`);
    const response = await axios.patch(`${CONTACT_ENDPOINT}/${contactId}/status`, {
      status: "In Progress"
    });
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
    const response = await axios.delete(`${CONTACT_ENDPOINT}/${contactId}`);
    logResponse('DELETE Contact - Success', response);
  } catch (error) {
    logResponse('DELETE Contact - Error', null, error);
  }
};

// Main test runner
const runAllTests = async () => {
  console.log(`${colors.bold}${colors.blue}🚀 Starting Contact API Tests${colors.reset}`);
  console.log(`${colors.blue}Base URL: ${BASE_URL}${colors.reset}`);
  console.log(`${colors.blue}Contact Endpoint: ${CONTACT_ENDPOINT}${colors.reset}`);
  
  // Test 1: Create Contact
  const contactId = await testCreateContact();
  
  // Test 2: Get All Contacts
  await testGetAllContacts();
  
  // Test 3: Get Contact by ID
  await testGetContactById(contactId);
  
  // Test 4: Update Contact Status
  await testUpdateContactStatus(contactId);
  
  // Test 5: Delete Contact
  await testDeleteContact(contactId);
  
  console.log(`${colors.bold}${colors.green}✅ All Contact API Tests Completed!${colors.reset}`);
};

// Run the tests
runAllTests().catch(console.error); 