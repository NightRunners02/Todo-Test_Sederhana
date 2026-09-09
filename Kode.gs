// ==========================================
// 1. OTOMATISASI DATABASE SPREADSHEET
// ==========================================
// Jalankan fungsi ini SATU KALI di editor Apps Script
function setupDatabase() {
  // Membuat Google Sheets baru secara otomatis
  var ss = SpreadsheetApp.create("Database To-Do List App");
  var sheet = ss.getActiveSheet();
  sheet.setName("Tasks");
  
  // Membuat Header Tabel Otomatis
  sheet.appendRow(["ID", "Task", "Status", "CreatedAt"]);
  
  // Format Header (Tebalkan teks & beri latar warna)
  var headerRange = sheet.getRange(1, 1, 1, 4);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#4A90E2");
  headerRange.setFontColor("#FFFFFF");
  
  // Simpan ID Spreadsheet ke Script Properties agar bisa diakses fungsi lain
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

// ==========================================
// 2. WEB APP ENDPOINT (doGet) - PERBAIKAN ERROR
// ==========================================
function doGet() {
  var html = HtmlService.createTemplateFromFile('Index').evaluate();
  html.setTitle('Nama Website');
  html.addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
  html.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // Perhatikan kapital huruf 'F' di setXFrameOptionsMode
  return html;
}

// ==========================================
// 3. FUNGSI CRUD (Create, Read, Update, Delete)
// ==========================================

// [READ] Mengambil seluruh data tugas
function getTasks() {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  var tasks = [];
  
  // Lewati baris pertama (header)
  for (var i = 1; i < data.length; i++) {
    tasks.push({
      id: data[i][0],
      task: data[i][1],
      status: data[i][2],
      createdAt: data[i][3]
    });
  }
  return tasks;
}

// [CREATE] Menambahkan tugas baru
function addTask(taskText) {
  if (!taskText || taskText.trim() === "") return;
  var sheet = getSheet();
  var id = "TASK_" + new Date().getTime(); // ID unik berdasarkan timestamp
  var createdAt = new Date().toLocaleString("id-ID");
  var status = "Pending";
  
  sheet.appendRow([id, taskText.trim(), status, createdAt]);
  return { id: id, task: taskText.trim(), status: status, createdAt: createdAt };
}

// [UPDATE] Mengubah status tugas (Pending <-> Completed)
function toggleTaskStatus(id, currentStatus) {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  var newStatus = (currentStatus === "Completed") ? "Pending" : "Completed";
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0].toString() === id.toString()) {
      sheet.getRange(i + 1, 3).setValue(newStatus); // Kolom ke-3 adalah Status
      return newStatus;
    }
  }
  return null;
}

// [DELETE] Menghapus tugas berdasarkan ID
function deleteTask(id) {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0].toString() === id.toString()) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}