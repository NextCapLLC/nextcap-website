# NextCap LLC Production Website

This is the final static production website package for NextCap LLC.

## Included
- Home page
- Advanced Roofing page with real project photos and before/after sections
- Next Coat page with real project photos and before/after sections
- Services page
- Projects page with filterable portfolio
- About page
- Contact page
- Request Estimate page
- Mobile responsive navigation and layouts
- Phone/email/location updates
- Real uploaded project photos only

## Business Info
- Phone: (304) 945-7040
- Email: info@nextcapllc.com
- Location: Hurricane, WV
- Service Area: West Virginia

## Cloudflare Pages: Direct Upload
1. Go to Cloudflare Dashboard > Workers & Pages.
2. Create application > Pages.
3. Choose Direct Upload / Upload assets.
4. Upload this ZIP file.
5. Cloudflare will publish a temporary pages.dev URL.

No build command is needed for this static package.

## Cloudflare Pages: GitHub Upload
If using GitHub, unzip this folder, upload all files and folders to the repository, then connect the repo to Cloudflare Pages.

Settings:
- Framework preset: None
- Build command: leave blank
- Build output directory: leave blank or `/`

## Notes
The contact and estimate forms currently show an on-page confirmation. To send submissions to info@nextcapllc.com, connect the forms through Cloudflare Pages Functions, Formspree, Basin, or another form handling service.
