// test-password.js
const { 
  hashPassword, 
  comparePassword, 
  validatePasswordStrength 
} = require('./src/helpers/passwordHelper');

const testPassword = async () => {
  console.log('\n🔐 Testing Password Helper...\n');

  // Test 1: Validate Password Strength
  console.log('📌 Test 1: Password Strength Validation');
  const weakPass = 'abc';
  const strongPass = 'MySecret@123';
  
  console.log('Weak password "abc":', validatePasswordStrength(weakPass));
  console.log('Strong password "MySecret@123":', validatePasswordStrength(strongPass));

  // Test 2: Hash Password
  console.log('\n📌 Test 2: Hashing Password');
  const password = 'MySecret@123';
  const hashed = await hashPassword(password);
  console.log('Original:', password);
  console.log('Hashed:', hashed);
  console.log('Hash length:', hashed.length);

  // Test 3: Compare Password
  console.log('\n📌 Test 3: Comparing Password');
  const isMatch = await comparePassword(password, hashed);
  console.log('Correct password match:', isMatch); // Should be true
  
  const isWrongMatch = await comparePassword('WrongPassword', hashed);
  console.log('Wrong password match:', isWrongMatch); // Should be false

  console.log('\n✅ Password tests completed!\n');
};

testPassword().catch(console.error);