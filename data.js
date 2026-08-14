/*
 * Reactive Unified Data Layer & Automation Engine
 * Supports automated ingestion, smart partner dispatch, and real-time event broadcasting.
 */

const Store = (() => {
  const WAGE_BASELINE = 85.60;
  const TIER_PAY = { premium: 35, standard: 25, quick: 15 };

  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  const DEFAULT_PARTNERS = [
    {
      uid: "usr_brp001",
      partnerId: "BRP001",
      name: "Rajesh Shinde",
      phone: "9876500001",
      pin: "1234",
      hub: "Dharampeth Hub",
      status: "Active",
      language: "hi",
      attendanceDate: todayStr(),
      photo: null,
      createdAt: Date.now() - 86400000 * 5
    },
    {
      uid: "usr_brp002",
      partnerId: "BRP002",
      name: "Sunita Wankhede",
      phone: "9876500002",
      pin: "1234",
      hub: "Dharampeth Hub",
      status: "Active",
      language: "mr",
      attendanceDate: todayStr(),
      photo: null,
      createdAt: Date.now() - 86400000 * 4
    },
    {
      uid: "usr_brp003",
      partnerId: "BRP003",
      name: "Amit Deshmukh",
      phone: "9876500003",
      pin: "1234",
      hub: "Sitabuldi Hub",
      status: "Active",
      language: "en",
      attendanceDate: todayStr(),
      photo: null,
      createdAt: Date.now() - 86400000 * 3
    },
    {
      uid: "usr_brp004",
      partnerId: "BRP004",
      name: "Kavita Raut",
      phone: "9876500004",
      pin: "1234",
      hub: "Sadar Hub",
      status: "Active",
      language: "hi",
      attendanceDate: todayStr(),
      photo: null,
      createdAt: Date.now() - 86400000 * 2
    }
  ];

  const DEFAULT_JOBS = [
    {
      jobId: "JOB101",
      bookingId: "BR-948210",
      customerName: "Dr. Ananya Sharma",
      customerPhone: "9822012345",
      address: "Flat 402, Gokul Enclave, West High Court Rd, Dharampeth, Nagpur",
      mapsLink: "https://maps.google.com/?q=Dharampeth+Nagpur",
      hub: "Dharampeth Hub",
      services: [
        { id: "utensils", name: "Utensils Cleaning", tierIndex: 1, tierLabel: "45 min (Regular Daily)", price: 129, minutes: 45, tierCategory: "quick" },
        { id: "mopsweep", name: "Mopping & Sweeping", tierIndex: 1, tierLabel: "2 BHK", price: 119, minutes: 30, tierCategory: "standard" }
      ],
      service: "Utensils Cleaning (45 min), Mopping & Sweeping (2 BHK)",
      date: todayStr(),
      timeSlot: "09:00 AM - 10:30 AM",
      durationMins: 75,
      customerPrice: 248,
      paymentStatus: "paid",
      base: WAGE_BASELINE,
      bonus: 40,
      penalty: 0,
      rating: 5,
      status: "Completed",
      partnerId: "BRP001",
      startedAt: new Date(Date.now() - 7200000).toISOString(),
      endedAt: new Date(Date.now() - 3600000).toISOString(),
      createdAt: Date.now() - 10800000,
      instructions: "Ring doorbell twice, please wear shoe covers provided at door."
    },
    {
      jobId: "JOB102",
      bookingId: "BR-948211",
      customerName: "Manoj Agrawal",
      customerPhone: "9823098765",
      address: "Bungalow 12, VIP Road, Ramdaspeth, Nagpur",
      mapsLink: "https://maps.google.com/?q=Ramdaspeth+Nagpur",
      hub: "Dharampeth Hub",
      services: [
        { id: "toiletbath", name: "Toilet & Bathroom Cleaning", tierIndex: 1, tierLabel: "1 Combined (Toilet + Bath)", price: 159, minutes: 35, tierCategory: "standard" },
        { id: "kitchen", name: "Kitchen Deep Reset", tierIndex: 0, tierLabel: "Standard Kitchen", price: 399, minutes: 60, tierCategory: "premium" }
      ],
      service: "Toilet & Bathroom (1 Combined), Kitchen Deep Reset",
      date: todayStr(),
      timeSlot: "11:00 AM - 12:45 PM",
      durationMins: 95,
      customerPrice: 558,
      paymentStatus: "cash",
      base: WAGE_BASELINE,
      bonus: 60,
      penalty: 0,
      rating: null,
      status: "Assigned",
      partnerId: "BRP002",
      startedAt: null,
      endedAt: null,
      createdAt: Date.now() - 1800000,
      instructions: "Call upon arrival at main society gate."
    }
  ];

  function load(key, fallback) {
    try {
      const data = localStorage.getItem("bloorush_" + key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function save(key, data) {
    try {
      localStorage.setItem("bloorush_" + key, JSON.stringify(data));
    } catch (e) {
      console.warn("Storage write error", e);
    }
  }

  let partners = load("partners", DEFAULT_PARTNERS);
  let jobs = load("jobs", DEFAULT_JOBS);
  let activityLogs = load("logs", [
    {
      id: "log_init",
      timestamp: Date.now() - 1800000,
      type: "DISPATCH",
      title: "Auto-Dispatch Success",
      message: "Order BR-948211 auto-matched to Sunita Wankhede (BRP002) in Dharampeth Hub.",
      badge: "success"
    },
    {
      id: "log_wa",
      timestamp: Date.now() - 1795000,
      type: "WHATSAPP",
      title: "WhatsApp Dispatch Alert Sent",
      message: "Notification sent to partner Sunita Wankhede (+91 9876500002) with job route.",
      badge: "wa"
    }
  ]);

  let currentAuthUser = load("auth_user", null);
  const subscribers = new Set();

  function notify() {
    save("partners", partners);
    save("jobs", jobs);
    save("logs", activityLogs);
    save("auth_user", currentAuthUser);
    subscribers.forEach((cb) => {
      try { cb(); } catch (err) { console.error("Subscriber error", err); }
    });
  }

  function subscribe(cb) {
    subscribers.add(cb);
    return () => subscribers.delete(cb);
  }

  function logActivity(type, title, message, badge = "info") {
    const entry = {
      id: "log_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
      timestamp: Date.now(),
      type,
      title,
      message,
      badge
    };
    activityLogs.unshift(entry);
    if (activityLogs.length > 50) activityLogs.pop();
    notify();
  }

  function ratingFactor(r) {
    if (r == null || r === "") return 1.0;
    const num = Number(r);
    if (num >= 4) return 1.0;
    if (num === 3) return 0.7;
    if (num === 2) return 0.4;
    return 0.0;
  }

  function calculateBonus(services, customerPrice, rating = null) {
    const rawIncentive = (services || []).reduce((sum, s) => {
      const cat = s.tierCategory || (s.tierLabel && s.tierLabel.toLowerCase().includes("deep") ? "premium" : "quick");
      return sum + (TIER_PAY[cat] || 15);
    }, 0);

    const afterRating = Math.floor(rawIncentive * ratingFactor(rating));
    const breakEvenMargin = Math.max(0, (customerPrice || 0) - WAGE_BASELINE);
    return Math.floor(Math.min(afterRating, breakEvenMargin));
  }

  function netEarnings(job) {
    return (job.base || 0) + (job.bonus || 0) - (job.penalty || 0);
  }

  function autoDispatch(job) {
    const activePresentPartners = partners.filter(p => 
      p.status === "Active" && 
      p.attendanceDate === (job.date || todayStr()) &&
      (!job.hub || p.hub === job.hub)
    );

    let assignedPartner = null;

    if (activePresentPartners.length > 0) {
      const dateJobs = jobs.filter(j => j.date === (job.date || todayStr()));
      const loadMap = {};
      dateJobs.forEach(j => {
        if (j.partnerId) loadMap[j.partnerId] = (loadMap[j.partnerId] || 0) + 1;
      });

      activePresentPartners.sort((a, b) => {
        const loadA = loadMap[a.partnerId] || 0;
        const loadB = loadMap[b.partnerId] || 0;
        return loadA - loadB;
      });

      assignedPartner = activePresentPartners[0];
    } else {
      const fallbackPartners = partners.filter(p => p.status === "Active" && p.attendanceDate === todayStr());
      if (fallbackPartners.length > 0) {
        assignedPartner = fallbackPartners[0];
      }
    }

    if (assignedPartner) {
      job.partnerId = assignedPartner.partnerId;
      job.status = "Assigned";

      logActivity(
        "AUTO_DISPATCH",
        "⚡ Automated Smart Dispatch",
        `Job ${job.jobId} (${job.customerName}) instantly auto-assigned to ${assignedPartner.name} (${assignedPartner.partnerId}) in ${assignedPartner.hub}.`,
        "success"
      );

      logActivity(
        "WHATSAPP",
        "📱 Automated WhatsApp Dispatch Alert",
        `Sent WhatsApp dispatch message to partner ${assignedPartner.name} (+91 ${assignedPartner.phone}) with GPS navigation & customer details.`,
        "wa"
      );
    } else {
      job.status = "Unassigned";
      job.partnerId = null;

      logActivity(
        "DISPATCH_HOLD",
        "⚠️ No Present Partner in Hub",
        `Job ${job.jobId} created in ${job.hub || 'Nagpur'} but no partner marked present today. Placed in Ops queue for manual assignment.`,
        "warning"
      );
    }

    return job;
  }

  return {
    today: todayStr,
    WAGE_BASELINE,
    subscribe,

    getCurrentUser: () => currentAuthUser,
    loginPartner: (phone, pin) => {
      const p = partners.find(x => String(x.phone).trim() === String(phone).trim() && String(x.pin).trim() === String(pin).trim());
      if (!p) throw new Error("Invalid phone number or PIN. Try 9876500001 / PIN: 1234");
      if (p.status !== "Active") throw new Error("Your partner account is inactive. Please contact Ops Admin.");
      currentAuthUser = { role: "partner", profile: p };
      notify();
      return p;
    },
    loginAdmin: (email, pass) => {
      if (email.trim().toLowerCase() === "admin@bloorush.app" && pass === "admin123") {
        currentAuthUser = { role: "admin", email: "admin@bloorush.app" };
        notify();
        return currentAuthUser;
      }
      throw new Error("Invalid admin credentials. Use admin@bloorush.app / admin123");
    },
    logout: () => {
      currentAuthUser = null;
      notify();
    },

    createCustomerOrder: (order) => {
      const jobId = "JOB" + (100 + jobs.length + 1);
      const bookingId = "BR-" + Math.floor(100000 + Math.random() * 900000);
      
      const newJob = {
        jobId,
        bookingId,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        address: order.address,
        mapsLink: order.mapsLink || `https://maps.google.com/?q=${encodeURIComponent(order.address)}`,
        hub: order.hub || "Dharampeth Hub",
        services: order.services,
        service: order.services.map(s => `${s.name} (${s.tierLabel})`).join(", "),
        date: order.date || todayStr(),
        timeSlot: order.timeSlot,
        durationMins: order.durationMins,
        customerPrice: order.customerPrice,
        paymentStatus: order.paymentStatus || "paid",
        base: WAGE_BASELINE,
        bonus: calculateBonus(order.services, order.customerPrice),
        penalty: 0,
        rating: null,
        instructions: order.instructions || "",
        createdAt: Date.now(),
        startedAt: null,
        endedAt: null
      };

      autoDispatch(newJob);

      jobs.unshift(newJob);
      logActivity(
        "BOOKING_INGESTED",
        "📥 New Customer Booking Received",
        `Order ${bookingId} placed by ${newJob.customerName} for ${newJob.service} (₹${newJob.customerPrice} · ${newJob.paymentStatus === 'paid' ? 'Paid Online' : 'Cash on Delivery'}).`,
        "info"
      );

      notify();
      return newJob;
    },

    getJobs: () => jobs,
    getJob: (jobId) => jobs.find(j => j.jobId === jobId || j.bookingId === jobId) || null,
    getJobsForPartner: (partnerId) => jobs.filter(j => j.partnerId === partnerId),
    
    updateJobStatus: (jobId, status) => {
      const job = jobs.find(j => j.jobId === jobId);
      if (!job) return;
      job.status = status;
      if (status === "Started" && !job.startedAt) {
        job.startedAt = new Date().toISOString();
        logActivity(
          "SERVICE_START",
          "🧹 Service Commenced",
          `Partner ${job.partnerId} started service for ${job.customerName} (${job.jobId}). Real-time stopwatch activated.`,
          "info"
        );
        logActivity(
          "WHATSAPP",
          "📱 Customer WhatsApp Alert",
          `Sent update to customer ${job.customerName} (+91 ${job.customerPhone}): "Your BlooRush cleaning partner has started your service."`,
          "wa"
        );
      } else if (status === "Completed" && !job.endedAt) {
        job.endedAt = new Date().toISOString();
        logActivity(
          "SERVICE_COMPLETE",
          "✅ Service Completed",
          `Job ${job.jobId} completed. Partner earnings recorded: ₹${netEarnings(job)}.`,
          "success"
        );
        logActivity(
          "WHATSAPP",
          "📱 Customer Rating Request",
          `Sent payment confirmation & rating request to ${job.customerName}.`,
          "wa"
        );
      }
      notify();
    },

    submitCustomerRating: (jobId, rating) => {
      const job = jobs.find(j => j.jobId === jobId || j.bookingId === jobId);
      if (!job) return;
      job.rating = Number(rating);
      job.bonus = calculateBonus(job.services, job.customerPrice, job.rating);
      logActivity(
        "RATING_SUBMIT",
        `⭐ Customer Rating: ${rating} Stars`,
        `${job.customerName} rated ${job.partnerId} with ${rating}★. Adjusted partner incentive: ₹${job.bonus}.`,
        "success"
      );
      notify();
    },

    updateJob: (jobId, changes) => {
      const idx = jobs.findIndex(j => j.jobId === jobId);
      if (idx !== -1) {
        jobs[idx] = { ...jobs[idx], ...changes };
        if (changes.services || changes.customerPrice || changes.rating) {
          jobs[idx].bonus = calculateBonus(jobs[idx].services, jobs[idx].customerPrice, jobs[idx].rating);
        }
        notify();
      }
    },

    deleteJob: (jobId) => {
      jobs = jobs.filter(j => j.jobId !== jobId);
      notify();
    },

    getPartners: () => partners,
    getPartner: (partnerId) => partners.find(p => p.partnerId === partnerId) || null,
    setAttendance: (partnerId, isPresent) => {
      const p = partners.find(x => x.partnerId === partnerId || x.uid === partnerId);
      if (p) {
        p.attendanceDate = isPresent ? todayStr() : "";
        logActivity(
          "ATTENDANCE",
          "🟢 Partner Attendance Updated",
          `${p.name} (${p.partnerId}) marked ${isPresent ? 'PRESENT' : 'ABSENT'} for today.`,
          isPresent ? "success" : "info"
        );
        notify();
      }
    },

    addPartner: (partner) => {
      const nextNum = partners.length + 1;
      const partnerId = "BRP" + String(nextNum).padStart(3, "0");
      const newPartner = {
        uid: "usr_" + Date.now(),
        partnerId,
        name: partner.name.trim(),
        phone: partner.phone.trim(),
        pin: partner.pin || "1234",
        hub: partner.hub || "Dharampeth Hub",
        status: "Active",
        language: partner.language || "en",
        attendanceDate: todayStr(),
        photo: partner.photo || null,
        createdAt: Date.now()
      };
      partners.push(newPartner);
      logActivity(
        "PARTNER_ONBOARD",
        "👷 New Partner Onboarded",
        `Added partner ${newPartner.name} (${partnerId}) assigned to ${newPartner.hub}.`,
        "success"
      );
      notify();
      return newPartner;
    },

    togglePartnerStatus: (partnerId) => {
      const p = partners.find(x => x.partnerId === partnerId || x.uid === partnerId);
      if (p) {
        p.status = p.status === "Active" ? "Inactive" : "Active";
        notify();
      }
    },

    getLogs: () => activityLogs,
    clearLogs: () => {
      activityLogs = [];
      notify();
    },

    calculateBonus,
    netEarnings,
    resetToDemoData: () => {
      partners = JSON.parse(JSON.stringify(DEFAULT_PARTNERS));
      jobs = JSON.parse(JSON.stringify(DEFAULT_JOBS));
      activityLogs = [];
      currentAuthUser = null;
      notify();
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Store;
}
