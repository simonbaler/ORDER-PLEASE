// utils.js - Shared utilities for ORDER PLEASE
(function(){
  function getUser(){ return JSON.parse(localStorage.getItem('user')||'{}'); }
  function setUser(u){ localStorage.setItem('user', JSON.stringify(u)); }

  function getCurrency(){
    const region = (getUser().region || '').toUpperCase();
    if (region.startsWith('IN')) return 'INR';
    if (region.startsWith('US')) return 'USD';
    if (region.startsWith('GB')) return 'GBP';
    if (region.startsWith('EU') || region.startsWith('DE') || region.startsWith('FR')) return 'EUR';
    return 'INR';
  }
  function formatCurrency(amount, currency){
    try{ return new Intl.NumberFormat(navigator.language, { style:'currency', currency: currency || getCurrency() }).format(amount); }catch(e){ return amount; }
  }

  // Region detection via locale / timezone (best-effort)
  function detectRegion(){
    const lang = navigator.language || 'en-IN';
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Kolkata')) return 'IN';
    if (tz.includes('Los_Angeles') || tz.includes('New_York')) return 'US';
    if (tz.includes('London')) return 'GB';
    if (tz.includes('Berlin') || tz.includes('Paris')) return 'EU';
    return lang.split('-')[1] || 'IN';
  }

  // Coupons
  const COUPONS = {
    SAVE10: { type:'percent', value:10, min: 0 },
    SAVE100: { type:'flat', value:100, min: 1000 },
    FREESHIP: { type:'shipping', value:1, min: 0 }
  };
  function applyCoupon(code, subtotal){
    const c = COUPONS[(code||'').toUpperCase()];
    if(!c) return { ok:false, msg:'Invalid coupon', discount:0 };
    if(subtotal < c.min) return { ok:false, msg:`Minimum order ${c.min} required`, discount:0 };
    let discount = 0;
    if (c.type==='percent') discount = subtotal * (c.value/100);
    else if (c.type==='flat') discount = c.value;
    else if (c.type==='shipping') discount = 50; // demo shipping waiver
    return { ok:true, msg:'Coupon applied', discount: Math.min(discount, subtotal*0.5) };
  }

  // EMI calculator simple
  function calcEMI(amount, months, annualRate){
    const r = (annualRate/12)/100; // monthly
    if (r===0) return amount / months;
    return (amount*r*Math.pow(1+r, months)) / (Math.pow(1+r, months)-1);
  }

  window.utils = { getUser, setUser, getCurrency, formatCurrency, detectRegion, applyCoupon, calcEMI };
})();
