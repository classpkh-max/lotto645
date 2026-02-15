# Design Guidelines: AI Lottery Number Recommendation Site

## Design Approach

**Hybrid Approach**: Combining data-driven utility with engaging visual presentation. Drawing inspiration from:
- **Linear/Notion**: Clean typography and spacing for credibility
- **Stripe**: Minimalist, trustworthy aesthetic for financial/lottery context
- **Data visualization sites**: Clear presentation of numerical information

This is a utility-focused application where trust and clarity are paramount, enhanced with strategic visual elements for the lottery ball displays and AI generation experience.

---

## Core Design Elements

### A. Typography
- **Primary Font**: Inter or SF Pro Display (via Google Fonts CDN)
- **Headings**: 
  - H1: text-4xl to text-5xl, font-bold (AI 번호 추천)
  - H2: text-2xl to text-3xl, font-semibold (section titles)
  - H3: text-xl, font-medium (회차 정보)
- **Body**: text-base to text-lg, font-normal
- **Numbers/Data**: text-lg to text-2xl, font-semibold (lottery numbers, round info)

### B. Layout System
- **Spacing Units**: Tailwind spacing of 4, 6, 8, 12, 16, 24 (p-4, p-6, p-8, etc.)
- **Container**: max-w-4xl centered with px-4 to px-6
- **Vertical Rhythm**: py-12 to py-16 between major sections
- **Component Spacing**: gap-4 to gap-6 for grids, space-y-4 for stacks

### C. Component Library

#### 1. Hero Section
- Centered layout with max-w-2xl
- Large heading announcing the AI recommendation service
- Prominent "AI 번호 추출" button (large, rounded-lg, px-8, py-4)
- Subtle descriptive text below button
- py-16 to py-20 section padding

#### 2. AI Number Generation Button & Loading
- **Button**: Large, prominent with rounded-lg, shadow-lg
- **Loading State**: 
  - Animated spinner or pulsing circle
  - "AI 분석 중..." text with animated dots (...)
  - Semi-transparent overlay (bg-opacity-90)
  - Smooth fade-in transition (transition-all duration-300)
  - Duration: 2-3 seconds for dramatic effect

#### 3. Generated Numbers Display
- **Container**: Rounded card with shadow-md, p-6 to p-8
- **Number Balls**: 
  - Circular elements (w-12 h-12 to w-16 h-16)
  - Flex row layout with gap-3 to gap-4
  - Numbers centered with font-bold, text-xl to text-2xl
  - Standard lottery color coding:
    - 1-10: Yellow theme
    - 11-20: Blue theme
    - 21-30: Red theme
    - 31-40: Gray theme
    - 41-45: Green theme
- **Animation**: Fade-in with slight scale effect (animate-in)

#### 4. Latest Winning Numbers Section
- **Title**: "최근 당첨번호" (text-2xl, font-semibold, mb-6)
- **Round Info**: 
  - "제 XXXX회" in text-lg, font-medium
  - Draw date "YYYY년 MM월 DD일 추첨" in text-sm
  - Arranged horizontally or stacked with space-y-1
- **Winning Numbers Display**:
  - Exact replication of official design from provided image
  - Grid or flex layout for balls
  - 6 main numbers + 1 bonus number separated by "+" symbol
  - Same ball sizing and color coding as generated numbers
  - Bonus number with subtle visual distinction (opacity-80 or outlined style)
- **Container**: Card with border, rounded-lg, p-6, shadow-sm

#### 5. Historical Data Section (Optional Enhancement)
- Previous draws in compact list format
- Truncated to 5-10 most recent draws
- Collapsible/expandable design

---

## Animations & Interactions

### Loading Animation
- Smooth spinner rotation (animate-spin)
- Pulsing circles or bars showing AI "thinking"
- Progress indicator or scanning effect
- Text that cycles: "데이터 분석 중..." → "패턴 인식 중..." → "번호 생성 중..."

### Number Generation Reveal
- Staggered fade-in for each ball (delay-[100] to delay-[500])
- Subtle bounce or scale effect on appearance
- Duration: 200-300ms per ball

### Button States
- Hover: Slight scale (scale-105), increased shadow
- Active: Slight scale down (scale-95)
- Disabled during loading: opacity-50, cursor-not-allowed

---

## Layout Structure

### Desktop (lg+)
1. **Hero Section** (centered, py-16)
   - Heading
   - AI 번호 추출 button
   - Brief description

2. **Generated Numbers Section** (max-w-2xl, mx-auto, my-12)
   - Generated numbers display card
   - Timestamp of generation

3. **Latest Winning Numbers** (max-w-2xl, mx-auto, py-12)
   - Round and date info
   - Official winning numbers display
   - Auto-refresh indicator (subtle)

### Mobile (base to md)
- Single column stack
- Reduced padding (py-8 to py-12)
- Smaller ball sizes (w-10 h-10)
- Increased gap between sections

---

## Images

No hero images needed. This is a utility-focused lottery application where the visual focus is on:
- The lottery number balls themselves (SVG circles with numbers)
- Clean iconography (Heroicons for UI elements like refresh, info icons)
- Optional: Subtle background pattern or gradient for visual interest without distraction

---

## Key UX Principles

1. **Trust & Credibility**: Clean, professional layout with clear data presentation
2. **Immediate Value**: Latest winning numbers visible without scrolling
3. **Engaging Experience**: AI loading animation creates anticipation
4. **Clear Hierarchy**: Generated numbers prominent, supporting info secondary
5. **Accessibility**: High contrast for number balls, clear labels, keyboard navigation
6. **Real-time Updates**: Visual indicator when latest numbers are fetched
7. **Simplicity**: Focus on core function - no clutter or unnecessary elements

---

## Technical Notes

- **Icons**: Use Heroicons (outline style) via CDN
- **Ball Colors**: Implement color mapping function for lottery number ranges
- **Loading State**: Minimum 2-second display for dramatic AI effect
- **Responsive**: Mobile-first approach, balls scale appropriately
- **Auto-refresh**: Fetch latest numbers on page load via web scraping