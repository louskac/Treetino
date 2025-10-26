# Timeline Component

A beautiful, animated timeline component for displaying chronological events with glassmorphic design, matching the Treetino website aesthetic inspired by react-bits style.

## Features

- ✨ **Smooth scroll animations** using Framer Motion
- 🎨 **Glassmorphic cards** with GlassSurface integration
- 📱 **Fully responsive** - alternating layout on desktop, vertical on mobile
- 💫 **Pulse animations** on timeline dots
- 🎯 **Customizable colors** per event
- 🔄 **Staggered reveal** animations as you scroll
- ⚡ **Interactive hover states** on cards and dots

## Installation

### 1. Copy the Timeline component
Place `Timeline.tsx` in your components folder (e.g., `@/Components/Timeline/Timeline.tsx`)

### 2. Create timeline data
Create a data file (e.g., `@/data/timelineData.ts`) with your events:

```typescript
import { TimelineEvent } from '@/Components/Timeline/Timeline';

export const myTimeline: TimelineEvent[] = [
  {
    year: '2022',
    title: 'Event Title',
    description: 'Event description goes here...',
    color: '#2762AD', // Optional custom color
    icon: '💡' // Optional emoji or icon
  },
  // Add more events...
];
```

### 3. Import and use in your page

```tsx
import Timeline from '@/Components/Timeline/Timeline';
import { myTimeline } from '@/data/timelineData';

export default function Page() {
  return (
    <div className="relative z-10 py-20 px-6">
      <Timeline events={myTimeline} />
    </div>
  );
}
```

## Props

### Timeline Component

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `events` | `TimelineEvent[]` | Yes | Array of timeline events |

### TimelineEvent Type

```typescript
type TimelineEvent = {
  year: string;          // Display year/date
  title: string;         // Event title
  description: string;   // Event description
  icon?: React.ReactNode; // Optional icon (emoji or React component)
  color?: string;        // Optional custom color (hex)
};
```

## Styling

The component uses:
- **Colors**: `#2762AD`, `#183D89`, `#E8F1FF` (Treetino brand colors)
- **Glassmorphism**: Via `GlassSurface` component
- **Animations**: Framer Motion with scroll-based triggers
- **Responsive**: Tailwind CSS breakpoints

### Customization

To customize colors globally, update the default colors in the component:
- Main gradient: `#2762AD` → `#183D89`
- Text: `#E8F1FF`
- Borders: `#2762AD/30` (opacity 30%)

## Layout Behavior

### Desktop (md and up)
- **Alternating cards**: Left → Right → Left
- **Central vertical line**
- **Horizontal slide-in animations**

### Mobile (< md)
- **Vertical layout**: All cards on the right
- **Left-aligned timeline line**
- **Simplified animations**

## Animation Details

1. **Scroll-triggered reveal**: Cards fade in and slide from the side as you scroll
2. **Pulse effect**: Timeline dots pulse continuously
3. **Hover interactions**: Cards scale and change border color
4. **Progress line**: Vertical line grows as you scroll
5. **Gradient line**: Animated gradient appears at bottom of each card

## Dependencies

Required packages (should already be in your project):
```json
{
  "framer-motion": "^10.x.x",
  "react": "^18.x.x",
  "tailwindcss": "^3.x.x"
}
```

Required components:
- `GlassSurface` component from your project

## Example with Full Section

```tsx
<div className="relative z-10 py-20 px-6">
  <div className="max-w-7xl w-full mx-auto">
    
    {/* Section Header */}
    <div className="text-center mb-16 space-y-4">
      <h2 className="text-4xl md:text-5xl font-bold text-[#E8F1FF]">
        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2762AD] via-[#183D89] to-[#2762AD]">Journey</span>
      </h2>
      
      <p className="text-lg text-[#E8F1FF]/60 max-w-2xl mx-auto">
        From vision to reality - the milestones that shaped our story
      </p>
    </div>

    {/* Timeline Component */}
    <Timeline events={myTimeline} />
  </div>
</div>
```

## Performance Tips

1. **Viewport optimization**: Uses `whileInView` with `once: true` to prevent re-animations
2. **Efficient animations**: Uses transforms (x, scale) instead of layout properties
3. **Lazy rendering**: Items only animate when near viewport

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support  
- Safari: ✅ Full support
- Mobile browsers: ✅ Optimized layout

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support (via Framer Motion)
- Reduced motion respected (Framer Motion default)

## Troubleshooting

**Cards not appearing:**
- Ensure `GlassSurface` component is properly imported
- Check that parent container has proper z-index

**Animations not working:**
- Verify Framer Motion is installed
- Check that container has relative positioning

**Line not centered on mobile:**
- Ensure Tailwind breakpoints are configured correctly
- Check that responsive classes (md:) are working

## Credits

Design inspired by:
- React Bits animation library
- Treetino brand guidelines
- Modern glassmorphic design trends