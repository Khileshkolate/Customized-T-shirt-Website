const fs = require('fs');
const path = require('path');

function checkFileExports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const hasDefaultExport = content.includes('export default');
    const hasNamedExport = content.includes('export {') || content.includes('export const') || content.includes('export function');
    
    console.log(`${filePath}:`);
    console.log(`  Default export: ${hasDefaultExport ? '✅' : '❌'}`);
    console.log(`  Named export: ${hasNamedExport ? '✅' : '❌'}`);
    console.log('');
  } catch (error) {
    console.log(`Error reading ${filePath}:`, error.message);
  }
}

// Check problematic files
checkFileExports('./src/components/admin/DataTable.jsx');
checkFileExports('./src/components/admin/StatsCard.jsx');
checkFileExports('./src/components/admin/AdminSidebar.jsx');
checkFileExports('./src/pages/admin/Dashboard.jsx');