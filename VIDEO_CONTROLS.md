# 🎬 Video Autoplay Controls

## Current Status: 

- **Cover Videos** (on main page): **ENABLED** ✅ 
- **Content Videos** (inside case studies): **ENABLED** ✅

## What Works:

- ✅ **Cover videos on homepage** autoplay normally
- ✅ **Videos inside case studies** autoplay normally
- ✅ **Full video functionality** everywhere

## To Disable Cover Video Autoplay:

1. Open `src/lib/design-system.ts`
2. Find this line:
```typescript
ENABLE_COVER_VIDEO_AUTOPLAY: true,
```
3. Change it to:
```typescript
ENABLE_COVER_VIDEO_AUTOPLAY: false,
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