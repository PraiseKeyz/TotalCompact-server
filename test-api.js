// Test script for Project API
const fetch = require("node-fetch");

const BASE_URL = "http://localhost:3000/api/v1/projects";

// Test data
const testProject = {
  name: "Test Residential Complex",
  description:
    "A test residential project for API testing purposes with modern amenities and sustainable design.",
  location: {
    address: "123 Test Street",
    city: "Test City",
    state: "Test State",
  },
  status: "Planning",
  projectType: "Residential",
  estimatedCompletionDate: "2025-12-31",
  totalUnits: 100,
  priceRange: {
    min: 200000,
    max: 600000,
  },
  features: [
    "Swimming Pool",
    "Fitness Center",
    "24/7 Security",
    "Underground Parking",
  ],
};

let createdProjectId = null;

async function testAPI() {
  console.log("🚀 Starting Project API Tests...\n");

  try {
    // Test 1: Create Project
    console.log("1. Testing Create Project...");
    const createResponse = await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testProject),
    });

    const createResult = await createResponse.json();

    if (createResponse.ok) {
      console.log("✅ Project created successfully!");
      console.log("Project ID:", createResult.data._id);
      createdProjectId = createResult.data._id;
    } else {
      console.log("❌ Failed to create project:", createResult);
      return;
    }

    // Test 2: Get All Projects
    console.log("\n2. Testing Get All Projects...");
    const getAllResponse = await fetch(`${BASE_URL}`);
    const getAllResult = await getAllResponse.json();

    if (getAllResponse.ok) {
      console.log("✅ Retrieved all projects successfully!");
      console.log("Total projects:", getAllResult.data.length);
    } else {
      console.log("❌ Failed to get projects:", getAllResult);
    }

    // Test 3: Get Project by ID
    if (createdProjectId) {
      console.log("\n3. Testing Get Project by ID...");
      const getByIdResponse = await fetch(`${BASE_URL}/${createdProjectId}`);
      const getByIdResult = await getByIdResponse.json();

      if (getByIdResponse.ok) {
        console.log("✅ Retrieved project by ID successfully!");
        console.log("Project name:", getByIdResult.data.name);
      } else {
        console.log("❌ Failed to get project by ID:", getByIdResult);
      }
    }

    // Test 4: Update Project
    if (createdProjectId) {
      console.log("\n4. Testing Update Project...");
      const updateData = {
        name: "Updated Test Project",
        status: "Under Construction",
        priceRange: {
          min: 250000,
          max: 700000,
        },
      };

      const updateResponse = await fetch(`${BASE_URL}/${createdProjectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const updateResult = await updateResponse.json();

      if (updateResponse.ok) {
        console.log("✅ Project updated successfully!");
        console.log("Updated name:", updateResult.data.name);
        console.log("Updated status:", updateResult.data.status);
      } else {
        console.log("❌ Failed to update project:", updateResult);
      }
    }

    // Test 5: Delete Project
    if (createdProjectId) {
      console.log("\n5. Testing Delete Project...");
      const deleteResponse = await fetch(`${BASE_URL}/${createdProjectId}`, {
        method: "DELETE",
      });

      const deleteResult = await deleteResponse.json();

      if (deleteResponse.ok) {
        console.log("✅ Project deleted successfully!");
      } else {
        console.log("❌ Failed to delete project:", deleteResult);
      }
    }

    // Test 6: Verify Deletion
    if (createdProjectId) {
      console.log("\n6. Verifying Project Deletion...");
      const verifyResponse = await fetch(`${BASE_URL}/${createdProjectId}`);

      if (verifyResponse.status === 404) {
        console.log("✅ Project successfully deleted (404 Not Found)");
      } else {
        console.log("❌ Project still exists after deletion");
      }
    }

    console.log("\n🎉 All API tests completed!");
  } catch (error) {
    console.error("❌ Test failed with error:", error.message);
  }
}

// Run the tests
testAPI();
