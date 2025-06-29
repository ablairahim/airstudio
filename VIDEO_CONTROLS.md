# 🎬 Video Autoplay Controls

## Current Status: 

- **Cover Videos** (on main page): **DISABLED** ❌ 
- **Content Videos** (inside case studies): **ENABLED** ✅

## What's Frozen:

- ✅ **Cover videos on homepage** are frozen (show first frame)
- ✅ **Much faster homepage loading**  
- ✅ **Less bandwidth usage**
- ✅ **Better mobile performance**

## What Still Works:

- ✅ **Videos inside case studies** still autoplay normally
- ✅ **Full functionality** when viewing individual cases

## To Enable Cover Video Autoplay:

1. Open `src/lib/design-system.ts`
2. Find this line:
```typescript
ENABLE_COVER_VIDEO_AUTOPLAY: false,
```
3. Change it to:
```typescript
ENABLE_COVER_VIDEO_AUTOPLAY: true,
```

## To Disable Content Videos:

1. Open `src/lib/design-system.ts`  
2. Find this line:
```typescript
ENABLE_CONTENT_VIDEO_AUTOPLAY: true,
```
3. Change it to:
```typescript
ENABLE_CONTENT_VIDEO_AUTOPLAY: false,
```

---

**Settings location:** `src/lib/design-system.ts` → `siteSettings`
- `ENABLE_COVER_VIDEO_AUTOPLAY` - controls homepage cover videos
- `ENABLE_CONTENT_VIDEO_AUTOPLAY` - controls videos inside case studies 