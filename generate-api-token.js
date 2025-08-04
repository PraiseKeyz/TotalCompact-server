const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const TOKEN_EXPIRY = process.env.JWT_EXPIRES_IN || '7d';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Generate API token
const generateApiToken = (userId = 'admin', role = 'admin') => {
  const payload = {
    userId,
    role,
    type: 'api',
    iat: Math.floor(Date.now() / 1000),
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
  return token;
};

// Generate multiple tokens for different purposes
const generateTokens = () => {
  console.log(`${colors.bold}${colors.blue}🔑 API Token Generator${colors.reset}`);
  console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}\n`);

  // Generate admin token
  const adminToken = generateApiToken('admin', 'admin');
  console.log(`${colors.bold}${colors.yellow}👑 Admin API Token:${colors.reset}`);
  console.log(`${colors.green}${adminToken}${colors.reset}\n`);

  // Generate user token
  const userToken = generateApiToken('user123', 'user');
  console.log(`${colors.bold}${colors.yellow}👤 User API Token:${colors.reset}`);
  console.log(`${colors.green}${userToken}${colors.reset}\n`);

  // Generate read-only token
  const readOnlyToken = generateApiToken('readonly', 'readonly');
  console.log(`${colors.bold}${colors.yellow}📖 Read-Only API Token:${colors.reset}`);
  console.log(`${colors.green}${readOnlyToken}${colors.reset}\n`);

  // Usage instructions
  console.log(`${colors.bold}${colors.blue}📋 Usage Instructions:${colors.reset}`);
  console.log(`${colors.blue}1. Add the token to your request headers:${colors.reset}`);
  console.log(`${colors.green}   Authorization: Bearer YOUR_TOKEN_HERE${colors.reset}\n`);
  
  console.log(`${colors.blue}2. Example curl command:${colors.reset}`);
  console.log(`${colors.green}   curl -H "Authorization: Bearer ${adminToken}" ${colors.reset}`);
  console.log(`${colors.green}   http://localhost:3000/api/v1/contact${colors.reset}\n`);

  console.log(`${colors.blue}3. Example axios request:${colors.reset}`);
  console.log(`${colors.green}   const response = await axios.get('http://localhost:3000/api/v1/contact', {${colors.reset}`);
  console.log(`${colors.green}     headers: {${colors.reset}`);
  console.log(`${colors.green}       'Authorization': 'Bearer ${adminToken}'${colors.reset}`);
  console.log(`${colors.green}     }${colors.reset}`);
  console.log(`${colors.green}   });${colors.reset}\n`);

  // Token details
  console.log(`${colors.bold}${colors.blue}🔍 Token Details:${colors.reset}`);
  console.log(`${colors.blue}• Expires in: ${TOKEN_EXPIRY}${colors.reset}`);
  console.log(`${colors.blue}• Secret: ${JWT_SECRET}${colors.reset}`);
  console.log(`${colors.blue}• Algorithm: HS256${colors.reset}\n`);

  // Security warning
  console.log(`${colors.bold}${colors.red}⚠️  Security Warning:${colors.reset}`);
  console.log(`${colors.red}• Keep tokens secure and don't share them${colors.reset}`);
  console.log(`${colors.red}• Change JWT_SECRET in production${colors.reset}`);
  console.log(`${colors.red}• Use HTTPS in production${colors.reset}`);
  console.log(`${colors.red}• Rotate tokens regularly${colors.reset}\n`);

  return {
    adminToken,
    userToken,
    readOnlyToken
  };
};

// Verify token function
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(`${colors.bold}${colors.green}✅ Token is valid!${colors.reset}`);
    console.log(`${colors.green}Decoded payload:${colors.reset}`);
    console.log(JSON.stringify(decoded, null, 2));
    return decoded;
  } catch (error) {
    console.log(`${colors.bold}${colors.red}❌ Token is invalid!${colors.reset}`);
    console.log(`${colors.red}Error: ${error.message}${colors.reset}`);
    return null;
  }
};

// Export functions for use in other scripts
module.exports = {
  generateApiToken,
  generateTokens,
  verifyToken
};

// Run if this file is executed directly
if (require.main === module) {
  const tokens = generateTokens();
  
  // Test token verification
  console.log(`${colors.bold}${colors.blue}🧪 Testing Token Verification:${colors.reset}`);
  verifyToken(tokens.adminToken);
} 