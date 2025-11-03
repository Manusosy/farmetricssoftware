# Geographic Data - Ghana & Kenya

## 📊 Complete Coverage

### Ghana 🇬🇭
- **16 Regions**
- **~50 Districts** (major urban and agricultural centers)
- **~250+ Locations** (towns, communities, neighborhoods)

### Kenya 🇰🇪  
- **17 Major Counties** (out of 47)
- **~60 Sub-Counties** (major urban and agricultural centers)
- **~400+ Locations** (wards, neighborhoods, towns)

---

## 🇬🇭 Ghana Geographic Structure

### All 16 Regions Covered

1. **Greater Accra Region** (GH-AA)
   - 6 Districts including Accra Metro, Tema Metro
   - 30+ Locations

2. **Ashanti Region** (GH-ASH)
   - 10 Districts including Kumasi Metro, Obuasi, Ejisu
   - 50+ Locations

3. **Western Region** (GH-WP)
   - 5 Districts including Sekondi-Takoradi Metro
   - 15+ Locations

4. **Central Region** (GH-CP)
   - 5 Districts including Cape Coast Metro
   - 15+ Locations

5. **Eastern Region** (GH-EP)
   - 5 Districts including Koforidua (New-Juaben)
   - 15+ Locations

6. **Volta Region** (GH-TV)
   - 4 Districts including Ho, Keta
   - 12+ Locations

7. **Northern Region** (GH-NP)
   - 3 Districts including Tamale Metro
   - 10+ Locations

8. **Upper East Region** (GH-UE)
   - 2 Districts: Bolgatanga, Bawku
   - 6+ Locations

9. **Upper West Region** (GH-UW)
   - 2 Districts: Wa, Lawra
   - 6+ Locations

10. **Brong-Ahafo Region** (GH-BA)
    - 3 Districts including Sunyani, Techiman
    - 9+ Locations

11. **Bono Region** (GH-BO)
    - 2 Districts
    - 6+ Locations

12. **Ahafo Region** (GH-AF)
    - 2 Districts
    - 6+ Locations

13. **Western North Region** (GH-WN)
    - 2 Districts
    - 6+ Locations

14. **Oti Region** (GH-OT)
    - 2 Districts
    - 6+ Locations

15. **North East Region** (GH-NE)
    - 1 District
    - 3+ Locations

16. **Savannah Region** (GH-SV)
    - 1 District
    - 3+ Locations

---

## 🇰🇪 Kenya Geographic Structure

### 17 Major Counties (out of 47)

1. **Nairobi County** (KE-NAI)
   - 17 Sub-Counties (complete coverage)
   - 80+ Locations/Wards

2. **Mombasa County** (KE-MBA)
   - 6 Sub-Counties (complete coverage)
   - 25+ Locations

3. **Kisumu County** (KE-KIS)
   - 4 Sub-Counties
   - 20+ Locations

4. **Nakuru County** (KE-NAK)
   - 3 Sub-Counties
   - 12+ Locations

5. **Kiambu County** (KE-KIA)
   - 4 Sub-Counties including Thika, Ruiru
   - 20+ Locations

6. **Machakos County** (KE-MAC)
   - 2 Sub-Counties
   - 8+ Locations

7. **Uasin Gishu County** (KE-UGI)
   - 2 Sub-Counties (Eldoret)
   - 10+ Locations

8. **Kakamega County** (KE-KAK)
   - 2 Sub-Counties
   - 10+ Locations

9. **Kilifi County** (KE-KIL)
   - 2 Sub-Counties
   - 10+ Locations

10. **Nyeri County** (KE-NYE)
    - 1 Sub-County
    - 4+ Locations

11. **Meru County** (KE-MER)
    - 2 Sub-Counties
    - 10+ Locations

12. **Kajiado County** (KE-KAJ)
    - 2 Sub-Counties
    - 10+ Locations

13. **Bungoma County** (KE-BUN)
    - 1 Sub-County
    - 7+ Locations

14. **Embu County** (KE-EMB)
    - 1 Sub-County
    - 4+ Locations

15. **Nandi County** (KE-NAN)
    - 1 Sub-County
    - 4+ Locations

16. **Kericho County** (KE-KER)
    - 1 Sub-County
    - 4+ Locations

---

## 🚀 How to Use

### Setup

1. **Create an organization first:**
```bash
python manage.py shell
>>> from apps.organizations.models import Organization
>>> org = Organization.objects.create(name="Farmetrics Platform", slug="farmetrics", is_active=True)
>>> exit()
```

2. **Seed Ghana geographic data:**
```bash
python manage.py seed_ghana_regions --organization=farmetrics
```

3. **Seed Kenya geographic data:**
```bash
python manage.py seed_kenya_regions --organization=farmetrics
```

### Example Output

```
Ghana Geographic Data Seeded Successfully!

Summary:
--------
Country: 1 (Ghana)
Regions: 16 created
Districts: 50 created
Locations: 250 created
Total: 317 geographic entities
```

---

## 📍 Geographic Hierarchy

```
Country (Level 0)
  └─► Region/County (Level 1)
      └─► District/Sub-County (Level 2)
          └─► Location/Ward (Level 3)
```

### Example: Ghana - Ashanti Region

```
Ghana (Country)
  └─► Ashanti Region
      ├─► Kumasi Metropolitan (District)
      │   ├─► Adum (Location)
      │   ├─► Asokwa (Location)
      │   ├─► Bantama (Location)
      │   ├─► Suame (Location)
      │   └─► [5 more locations...]
      │
      ├─► Obuasi Municipal (District)
      │   ├─► Obuasi Town (Location)
      │   ├─► Anyinam (Location)
      │   └─► [2 more locations...]
      │
      └─► [8 more districts...]
```

### Example: Kenya - Nairobi County

```
Kenya (Country)
  └─► Nairobi County
      ├─► Westlands Sub-County (District)
      │   ├─► Parklands (Location)
      │   ├─► Kitisuru (Location)
      │   ├─► Kangemi (Location)
      │   └─► [3 more locations...]
      │
      ├─► Langata Sub-County (District)
      │   ├─► Karen (Location)
      │   ├─► South C (Location)
      │   └─► [2 more locations...]
      │
      └─► [15 more sub-counties...]
```

---

## 🎯 Usage in Application

### Assign Supervisor to Region

```python
from apps.regions.models import Region, RegionSupervisor
from apps.accounts.models import User

# Get Ashanti Region
ashanti = Region.objects.get(code='GH-ASH')

# Get supervisor user
supervisor = User.objects.get(email='supervisor@example.com')

# Assign supervisor to region
assignment = RegionSupervisor.objects.create(
    region=ashanti,
    supervisor=supervisor,
    assigned_by=admin_user,
    is_active=True
)

# Supervisor can now see:
# - All 10 districts in Ashanti
# - All 50+ locations under those districts
# - All field officers assigned to Ashanti region
```

### Query All Districts in a Region

```python
# Get all districts in Ashanti Region
ashanti = Region.objects.get(code='GH-ASH')
districts = ashanti.subregions.filter(level_type='district', is_active=True)

print(f"Districts in {ashanti.name}:")
for district in districts:
    location_count = district.subregions.filter(level_type='location').count()
    print(f"  - {district.name}: {location_count} locations")
```

### Query Geographic Hierarchy

```python
# Get full path for a location
location = Region.objects.get(code='GH-ASH-KMA-ADUM')
print(location.full_path)
# Output: Ghana > Ashanti Region > Kumasi Metropolitan > Adum

# Get all ancestors
ancestors = location.get_all_ancestors()
# Returns: [Kumasi Metro, Ashanti Region, Ghana]

# Get all children of a region
ashanti = Region.objects.get(code='GH-ASH')
all_children = ashanti.get_all_children()
# Returns: All districts and locations recursively
```

---

## 📊 Statistics

### Ghana
- **Total Entities**: ~317+
- **Coverage**: Complete national coverage
- **Focus**: Cocoa-growing regions (Ashanti, Western, Eastern, Central)

### Kenya
- **Total Entities**: ~500+
- **Coverage**: Major urban and agricultural centers
- **Focus**: Coffee-growing regions (Central, Rift Valley)

---

## 🔄 Extending the Data

### Add More Locations

```python
from apps.regions.models import Region

# Get district
kumasi_metro = Region.objects.get(code='GH-ASH-KMA')

# Add new location
new_location = Region.objects.create(
    organization=kumasi_metro.organization,
    name='New Community Name',
    code='GH-ASH-KMA-NEWCOMM',
    parent_region=kumasi_metro,
    level=3,
    level_type='location',
    is_active=True
)
```

### Add More Districts

```python
# Get region
ashanti = Region.objects.get(code='GH-ASH')

# Add new district
new_district = Region.objects.create(
    organization=ashanti.organization,
    name='New District Name',
    code='GH-ASH-NEWDIST',
    parent_region=ashanti,
    level=2,
    level_type='district',
    is_active=True
)
```

---

## ✅ Data Quality

- ✅ All region codes follow ISO-style patterns
- ✅ Proper hierarchical relationships maintained
- ✅ Auto-calculated levels
- ✅ Unique codes per organization
- ✅ Real-world geographic names and structures
- ✅ Major agricultural and urban centers included
- ✅ Extensible for additional countries

---

**Ready to assign supervisors and field officers to these geographic areas!** 🌍

