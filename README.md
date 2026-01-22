# Islettes Twirl Team Website

A professional static website for the Islettes Twirl Team - showcasing our baton twirling programs, team members, events, and providing information for prospective athletes and their families.

## About

Islettes Twirl Team is a competitive baton twirling organization dedicated to excellence in performance and athletic development. This website serves as our digital home, providing information about our programs, upcoming events, team achievements, and enrollment opportunities.

## Project Structure

```
islettes-twirl/
├── index.html              # Home page
├── about.html              # About us and team information
├── programs.html           # Program offerings and details
├── events.html             # Upcoming events and competitions
├── gallery.html            # Photo gallery
├── contact.html            # Contact form and information
├── css/
│   └── main.css           # Main stylesheet
├── js/
│   └── main.js            # JavaScript functionality
├── assets/
│   ├── images/            # Image assets
│   └── icons/             # Icons and favicon
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Pages deployment workflow
├── LICENSE                 # MIT License
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Features

- **Responsive Design**: Mobile-first approach ensuring optimal viewing on all devices
- **Accessibility**: WCAG AA compliant with semantic HTML and ARIA labels
- **SEO Optimized**: Unique meta tags, Open Graph tags, and semantic structure
- **Modern CSS**: Clean design using CSS Grid and Flexbox (no frameworks)
- **Interactive Navigation**: Smooth scrolling and mobile menu
- **Contact Form**: Functional contact form with validation
- **Performance**: Lightweight, fast-loading pages with minimal dependencies

## Pages

1. **Home (index.html)**: Hero section, program overview, and call-to-action
2. **About (about.html)**: Team history, mission, coaches, and achievements
3. **Programs (programs.html)**: Detailed program information for all age groups
4. **Events (events.html)**: Upcoming performances, competitions, and special events
5. **Gallery (gallery.html)**: Photo galleries from competitions and performances
6. **Contact (contact.html)**: Contact form, location, and FAQ

## Development Workflow

This project uses a two-branch workflow:

### Branches

- **`develop`**: Development branch for all code changes and updates
- **`main`**: Production branch - only updated when ready to deploy

### Workflow

1. All development work is done on the `develop` branch
2. Make changes and commit to `develop`
3. Test thoroughly on the `develop` branch
4. When ready to deploy, merge `develop` into `main`
5. GitHub Actions automatically deploys `main` to GitHub Pages

### Making Changes

```bash
# Ensure you're on the develop branch
git checkout develop

# Make your changes to files
# ...

# Stage and commit changes
git add .
git commit -m "type: description of changes"

# Push to develop
git push origin develop

# When ready to deploy, merge to main
git checkout main
git merge develop
git push origin main
```

## GitHub Pages Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Deployment Process

1. The GitHub Actions workflow (`.github/workflows/deploy.yml`) is triggered on push to `main`
2. The workflow builds and deploys the site to GitHub Pages
3. The site becomes available at: `https://[username].github.io/islettes-twirl/`

### Initial Setup

To enable GitHub Pages for this repository:

1. Go to repository Settings > Pages
2. Under "Build and deployment":
   - Source: GitHub Actions (the workflow will handle deployment)
3. The workflow will automatically deploy when `main` is updated

**Note**: The first deployment may take a few minutes. Subsequent deployments are typically faster.

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties (CSS variables)
- **Vanilla JavaScript**: No frameworks or libraries
- **GitHub Pages**: Static site hosting
- **GitHub Actions**: Automated deployment

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

This website follows WCAG 2.1 AA guidelines:

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Skip to main content link
- Sufficient color contrast
- Responsive text sizing
- Alt text for images (when added)
- Focus indicators

## Performance

- No external dependencies or frameworks
- Optimized CSS and JavaScript
- Minimal HTTP requests
- Fast load times
- Mobile-optimized assets

## Local Development

To work on this site locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/[username]/islettes-twirl.git
   cd islettes-twirl
   ```

2. Checkout the develop branch:
   ```bash
   git checkout develop
   ```

3. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js http-server
   npx http-server
   ```

4. Make changes and test locally before committing

## Contributing

1. All changes should be made on the `develop` branch
2. Follow the existing code style and structure
3. Test changes across different browsers and devices
4. Use meaningful commit messages following Conventional Commits format
5. Update documentation as needed

### Commit Message Format

```
type: brief description

Examples:
feat: add team roster section to about page
fix: correct navigation menu alignment on mobile
docs: update README with deployment instructions
style: improve contact form layout
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions about this website or the Islettes Twirl Team:

- **Email**: info@islettestwirl.com
- **Phone**: (555) 123-4567
- **Website**: [Your deployed site URL]

---

Built with dedication by the Islettes Twirl Team | © 2026 All Rights Reserved
