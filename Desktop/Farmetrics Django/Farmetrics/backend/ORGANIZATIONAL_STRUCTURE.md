# Farmetrics - Organizational & Geographic Structure

## 🌍 Platform Hierarchy

### User Roles & Responsibilities

```
┌─────────────────────────────────────────────────────────────────┐
│                         SUPER ADMIN                              │
│              (Platform Owner - Manages Everything)               │
│                                                                  │
│  • Manages Country Admins                                       │
│  • Platform-wide settings and configuration                     │
│  • Billing and subscription management                          │
│  • System-level reports and analytics                           │
└──────────────────────────┬──────────────────────────────────────┘
                           │
        ┌──────────────────┴──────────────────┬──────────────────┐
        │                                     │                  │
        ▼                                     ▼                  ▼
┌───────────────────┐              ┌───────────────────┐  ┌─────────────┐
│  COUNTRY ADMIN    │              │  COUNTRY ADMIN    │  │  COUNTRY... │
│     (Ghana)       │              │     (Kenya)       │  │             │
├───────────────────┤              ├───────────────────┤  └─────────────┘
│ • Manages all     │              │ • Manages all     │
│   Regional        │              │   Regional        │
│   Supervisors     │              │   Supervisors     │
│ • Approves new    │              │ • Approves new    │
│   accounts        │              │   accounts        │
│ • Assigns regions │              │ • Assigns regions │
│ • Approves        │              │ • Approves        │
│   transfers       │              │   transfers       │
│ • Country-level   │              │ • Country-level   │
│   analytics       │              │   analytics       │
└─────────┬─────────┘              └─────────┬─────────┘
          │                                  │
    ┌─────┴─────┬──────────┬──────────┐    │
    ▼           ▼          ▼          ▼    ▼
┌─────────┐ ┌──────────┐ ┌──────┐ ┌──────┐ ┌─────────┐
│Regional │ │Regional  │ │Reg.  │ │Reg.  │ │Regional │
│Sup.     │ │Sup.      │ │Sup.  │ │Sup.  │ │Sup.     │
│(Ashanti)│ │(Greater  │ │(Brong│ │(...) │ │(Nairobi)│
│         │ │ Accra)   │ │Ahafo)│ │      │ │         │
├─────────┤ ├──────────┤ └──────┘ └──────┘ ├─────────┤
│• Manages│ │• Manages │                   │• Manages│
│  Field  │ │  Field   │                   │  Field  │
│  Officers│ │  Officers│                   │  Officers│
│• Views   │ │• Views   │                   │• Views   │
│  all     │ │  all     │                   │  all     │
│  districts│ │  districts│                   │  districts│
│  in region│ │  in region│                   │  in region│
│• Tracks  │ │• Tracks  │                   │• Tracks  │
│  field   │ │  field   │                   │  field   │
│  activity│ │  activity│                   │  activity│
│• Can     │ │• Can     │                   │• Can     │
│  request │ │  request │                   │  request │
│  transfer│ │  transfer│                   │  transfer│
└────┬─────┘ └────┬─────┘                   └────┬─────┘
     │            │                              │
  ┌──┴──┬─────┐  │                              │
  ▼     ▼     ▼  ▼                              ▼
┌───┐ ┌───┐ ┌───┐┌───┐                        ┌───┐
│FO │ │FO │ │FO ││FO │                        │FO │
│   │ │   │ │   ││   │                        │   │
│(District A)│ │(District B)                  │(District X)
│(Location 1)│ │(Location 2)                  │(Location Y)
└───┘ └───┘ └───┘└───┘                        └───┘

FO = Field Officer (Mobile App Only)
```

## 📍 Geographic Hierarchy

### Structure
```
Country
  └─► Region
      └─► District
          └─► Location/Community
```

### Example: Ghana
```
Ghana (Country - Level 0)
  │
  ├─► Ashanti Region (Level 1)
  │    ├─► Kumasi Metro (District - Level 2)
  │    │    ├─► Adum (Location - Level 3)
  │    │    ├─► Asokwa (Location - Level 3)
  │    │    └─► Bantama (Location - Level 3)
  │    │
  │    ├─► Obuasi Municipal (District - Level 2)
  │    │    ├─► Obuasi Town (Location - Level 3)
  │    │    └─► Anyinam (Location - Level 3)
  │    │
  │    └─► Ejisu (District - Level 2)
  │         └─► Ejisu Town (Location - Level 3)
  │
  ├─► Greater Accra Region (Level 1)
  │    ├─► Accra Metro (District - Level 2)
  │    │    ├─► Osu (Location - Level 3)
  │    │    ├─► Labone (Location - Level 3)
  │    │    └─► Cantonments (Location - Level 3)
  │    │
  │    └─► Tema (District - Level 2)
  │         └─► Tema Community 1 (Location - Level 3)
  │
  ├─► Brong-Ahafo Region (Level 1)
  │    └─► (Districts and Locations...)
  │
  └─► (More Regions...)
```

### Example: Kenya (Future)
```
Kenya (Country - Level 0)
  │
  ├─► Nairobi Region (Level 1)
  │    ├─► Nairobi Central (District - Level 2)
  │    │    └─► Locations...
  │    └─► Other Districts...
  │
  └─► Mombasa Region (Level 1)
       └─► Districts and Locations...
```

## 🔐 Permission Scoping

### Super Admin
- **Scope**: Entire platform (all countries)
- **Can See**: Everything
- **Can Manage**: 
  - All Country Admins
  - Platform settings
  - Billing and subscriptions
  - System-wide analytics

### Country Admin
- **Scope**: Single country (e.g., Ghana only)
- **Can See**: 
  - All regions, districts, locations in their country
  - All supervisors and field officers in their country
  - All farms and farmers in their country
- **Can Manage**:
  - Approve/reject new supervisor accounts
  - Assign supervisors to regions
  - Approve/reject transfer requests
  - Country-level analytics and reports
  - Regional supervisors

### Regional Supervisor
- **Scope**: Single region (e.g., Ashanti Region only)
- **Can See**:
  - All districts and locations within their region
  - All field officers assigned to their region
  - All farms and farmers in their region
  - All visits in their region
- **Can Manage**:
  - Field officers in their region
  - Approve/reject field officer requests
  - View field activity tracking
  - Regional analytics
- **Can Request**:
  - Transfer to another region (requires Admin approval)

### Field Officer (Mobile App Only)
- **Scope**: Assigned district(s) or location(s)
- **Can See**:
  - Farms and farmers in their assigned area
  - Their own visits and media uploads
- **Can Do**:
  - Create visits
  - Upload media
  - Edit assigned farmer/farm records
  - Submit requests (transfers, leave, etc.)
- **Cannot Access**: Web application

### Analyst
- **Scope**: Based on assignment (country, region, or organization-wide)
- **Can See**:
  - Analytics and reports for their scope
  - Farmers, farms, visits (read-only)
- **Cannot**:
  - Modify any data
  - Approve requests
  - Manage users

### Auditor
- **Scope**: Based on assignment
- **Can See**:
  - Audit logs
  - All data (read-only)
- **Cannot**:
  - Modify any data
  - Approve requests

## 🔄 Account Creation & Assignment Workflow

### For Supervisors
1. **Supervisor creates account** via web app registration
2. **Status**: Account created but inactive
3. **Country Admin reviews** new account
4. **Country Admin approves** account
5. **Country Admin assigns** supervisor to a specific region
6. **Supervisor can now login** and see their region (all districts and locations)
7. **Supervisor sees dashboard** with:
   - All districts and locations in their region
   - All field officers assigned to their region
   - Field activity tracking
   - Regional analytics

### For Field Officers
1. **Field Officer creates account** via mobile app
2. **Status**: Account pending approval
3. **Country Admin (or delegated Supervisor) reviews**
4. **Country Admin approves** account
5. **Country Admin (or Supervisor) assigns** field officer to:
   - Specific district(s)
   - Specific location(s)
   - Specific supervisor
6. **Field Officer can now use mobile app** for assigned areas

## 📋 Transfer Request Workflow

### Supervisor Transfer Request
1. **Supervisor requests transfer** to different region
2. **Request includes**: Target region, reason
3. **Country Admin receives notification**
4. **Country Admin reviews** request
5. **Country Admin approves or declines**
6. If approved:
   - Supervisor is reassigned to new region
   - All their field officers remain in old region
   - Access scope changes to new region

### Field Officer Transfer Request
1. **Field Officer requests transfer** via mobile app
2. **Current Supervisor receives notification**
3. **Supervisor approves/declines** (or escalates to Admin)
4. If approved:
   - Field officer reassigned to new area
   - Historical data remains accessible

## 🗺️ Dashboard Views

### Country Admin Dashboard
```
Ghana Dashboard
├─ Total Regions: 16
├─ Total Districts: 260
├─ Total Supervisors: 45
├─ Total Field Officers: 1,200
├─ Total Farms: 25,000
├─ Total Farmers: 18,000
├─ Recent Activities
├─ Pending Approvals (New accounts, transfers)
├─ Country-wide Analytics
└─ Regional Performance Comparison
```

### Regional Supervisor Dashboard (e.g., Ashanti Region)
```
Ashanti Region Dashboard
├─ Districts: 43
├─ Locations: 350+
├─ Field Officers: 180 (assigned to me)
├─ Active Farms: 4,200
├─ Active Farmers: 3,100
├─ Recent Visits: Last 7 days
├─ Field Officer Activity Tracking
│   ├─ Officer A: 15 visits (Kumasi Metro)
│   ├─ Officer B: 12 visits (Obuasi Municipal)
│   └─ Officer C: 8 visits (Ejisu)
├─ Pending Requests (from my field officers)
└─ Regional Analytics
```

### Field Officer View (Mobile - e.g., Kumasi Metro)
```
My Assignments
├─ District: Kumasi Metro
├─ Locations: Adum, Asokwa, Bantama
├─ My Farms: 85
├─ My Farmers: 62
├─ My Visits This Week: 12
├─ Pending Tasks
└─ Create New Visit
```

## 💾 Database Implementation

### Region Model Updates Needed
- `level_type` field: 'country', 'region', 'district', 'location'
- Proper hierarchy validation
- Country-specific region codes

### User/Role Updates Needed
- Country Admin role distinct from Super Admin
- Country assignment for Country Admins
- Region assignment for Supervisors
- District/Location assignment for Field Officers

### Assignment Models Needed
- `UserAssignment` model:
  - User FK
  - Geographic scope (country/region/district/location)
  - Assignment type (permanent/temporary)
  - Assigned by, assigned at

## 🎯 Key Implementation Changes

1. **Update Role Model** to include:
   - `country_admin` role (distinct from `super_admin`)
   - Proper permission scoping

2. **Update RegionSupervisor** to:
   - Include assignment approval workflow
   - Track transfer history

3. **Create Geographic Assignment Model**:
   - Links users to specific geographic scopes
   - Tracks assignment history

4. **Update Middleware**:
   - Set geographic scope based on user role
   - Filter queries by scope automatically

5. **Create Transfer Request Module**:
   - Transfer request model
   - Approval workflow
   - Notification system

---

**Does this match your vision perfectly?** This structure ensures:
- ✅ Super Admin manages the platform
- ✅ Country Admins manage their country
- ✅ Supervisors manage their region (seeing all districts/locations)
- ✅ Field Officers work in assigned areas via mobile
- ✅ Proper approval workflows for accounts and transfers
- ✅ Scoped dashboards showing relevant data only

