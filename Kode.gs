// ==========================================
// 1. OTOMATISASI DATABASE SPREADSHEET
// ==========================================
// Jalankan fungsi ini SATU KALI di editor Apps Script
function setupDatabase() {
  // Membuat Google Sheets baru secara otomatis
  var ss = SpreadsheetApp.create("Database To-Do List App Multiuser");
  var sheet = ss.getActiveSheet();
  sheet.setName("Tasks");
  
  // Membuat Header Tabel Otomatis (Kolom UserEmail)
  sheet.appendRow(["ID", "Task", "Status", "CreatedAt", "UserEmail"]);
  
  // Format Header (Tebalkan teks & beri latar warna)
  var headerRange = sheet.getRange(1, 1, 1, 5);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#4A90E2");
  headerRange.setFontColor("#FFFFFF");
  
  // Simpan ID Spreadsheet ke Script Properties
  PropertiesService.getScriptProperties().setProperty("SPREADSHEET_ID", ss.getId());
  
  Logger.log("✅ Database Spreadsheet berhasil dibuat!");
  Logger.log("URL Spreadsheet: " + ss.getUrl());
}

// Helper internal untuk mengambil sheet
function getSheet() {
  var ssId = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (!ssId) {
    throw new Error("Silakan jalankan fungsi setupDatabase() terlebih dahulu!");
  }
  return SpreadsheetApp.openById(ssId).getSheetByName("Tasks");
}

// Helper untuk mendapatkan Email Pengguna Aktif
function getCurrentUserEmail() {
  var email = Session.getActiveUser().getEmail();
  return email || "guest@user.com";
}

// ==========================================
// 2. WEB APP ENDPOINT (doGet)
// ==========================================
function doGet() {
  var html = HtmlService.createTemplateFromFile('Index').evaluate();
  html.setTitle('Task Manager - Multiuser');
  html.addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
  html.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return html;
}

// ==========================================
// 3. FUNGSI AUTHENTICATION / INFO USER
// ==========================================
function getUserProfile() {
  var email = getCurrentUserEmail();
  return {
    email: email,
    name: email.split('@')[0]
  };
}

// ==========================================
// 4. FUNGSI CRUD DENGAN ISOLASI USER DATA
// ==========================================

// [READ] Mengambil seluruh data tugas milik user yang sedang login
function getTasks() {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  var userEmail = getCurrentUserEmail();
  var tasks = [];
  
  // Lewati baris pertama (header)
  for (var i = 1; i < data.length; i++) {
    if (data[i][4] && data[i][4].toString() === userEmail) {
      tasks.push({
        id: data[i][0],
        task: data[i][1],
        status: data[i][2],
        createdAt: data[i][3]
      });
    }
  }
  return tasks;
}

// [CREATE] Menambahkan tugas baru khusus untuk user login
function addTask(taskText) {
  if (!taskText || taskText.trim() === "") return;
  var sheet = getSheet();
  var userEmail = getCurrentUserEmail();
  var id = "TASK_" + new Date().getTime();
  var createdAt = new Date().toLocaleString("id-ID");
  var status = "Pending";
  
  sheet.appendRow([id, taskText.trim(), status, createdAt, userEmail]);
  return { id: id, task: taskText.trim(), status: status, createdAt: createdAt };
}

// [UPDATE] Mengubah status tugas milik user login
function toggleTaskStatus(id, currentStatus) {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  var userEmail = getCurrentUserEmail();
  var newStatus = (currentStatus === "Completed") ? "Pending" : "Completed";
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0].toString() === id.toString() && data[i][4] && data[i][4].toString() === userEmail) {
      sheet.getRange(i + 1, 3).setValue(newStatus);
      return newStatus;
    }
  }
  return null;
}

// [DELETE] Menghapus tugas milik user login
function deleteTask(id) {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  var userEmail = getCurrentUserEmail();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0].toString() === id.toString() && data[i][4] && data[i][4].toString() === userEmail) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}