// admin.js - helpers for ORDER PLEASE admin panel
(function(){
  const notifyKey = 'admin_notifications';
  const auditKey = 'admin_audit_log';

  function pushNotification(text){
    const list = JSON.parse(localStorage.getItem(notifyKey)||'[]');
    list.unshift({ text, time:new Date().toLocaleString() });
    localStorage.setItem(notifyKey, JSON.stringify(list));
    return list;
  }
  function getNotifications(){ return JSON.parse(localStorage.getItem(notifyKey)||'[]'); }

  function audit(action, detail){
    const log = JSON.parse(localStorage.getItem(auditKey)||'[]');
    log.unshift({ action, detail, time:new Date().toLocaleString() });
    localStorage.setItem(auditKey, JSON.stringify(log));
    return log;
  }
  function getAudit(){ return JSON.parse(localStorage.getItem(auditKey)||'[]'); }

  function toCSV(rows){
    if(!rows.length) return '';
    const keys = Object.keys(rows[0]);
    const header = keys.join(',');
    const body = rows.map(r => keys.map(k => JSON.stringify(r[k]??'')).join(',')).join('\n');
    return header + '\n' + body;
  }
  function downloadCSV(filename, data){
    const blob = new Blob([data], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
  }
  function importCSV(text){
    const [head, ...lines] = text.trim().split(/\r?\n/);
    const keys = head.split(',').map(s=>s.replace(/^"|"$/g,''));
    return lines.map(line => {
      const cols = line.match(/("[^"]*"|[^,]+)/g)||[];
      const obj = {}; keys.forEach((k,i)=> obj[k] = JSON.parse(cols[i]||'""')); return obj;
    });
  }

  window.adminUtils = { pushNotification, getNotifications, audit, getAudit, toCSV, downloadCSV, importCSV };
})();
