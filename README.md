# Disability Sports Channel Website

This is the official website for Disability Sports Channel, a platform dedicated to para sports content, news, and entertainment.

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-organization/disability-sports-channel.git
cd disability-sports-channel
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `lib/` - Utility functions and data services
- `public/` - Static assets like images

## Key Features

- **Live Streaming**: Watch live para sport events
- **News Articles**: Latest news and stories from the world of para sports
- **Podcasts**: Para Sport Talks podcast series
- **Summit Information**: Details about the upcoming DSC Summit 2025
- **Responsive Design**: Works on all devices from mobile to desktop

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Deployment

The website is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## Content Management

Currently, the website uses mock data stored in `lib/data-service.ts`. In a production environment, this should be replaced with API calls to a headless CMS or backend service.

## Customization

### Colors

The primary color scheme uses teal accents on a dark background. To modify the color scheme:

1. Edit `tailwind.config.ts` to update the color palette
2. Update component styles as needed

### Adding New Pages

1. Create a new file in the `app` directory following the Next.js App Router conventions
2. Use existing components or create new ones as needed
3. Update navigation links in `components/site-header.tsx` and `components/mobile-nav.tsx`

## Browser Support

The website supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contact

For any questions or support, please contact:
- Email: contact@disabilitysportschannel.co.uk

## License

All rights reserved. This codebase is proprietary and confidential.
\`\`\`

Let's create a favicon and manifest file:
