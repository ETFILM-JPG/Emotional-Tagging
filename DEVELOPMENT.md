# Development Setup Guide

## Prerequisites

- **Node.js** 16+ (for frontend)
- **Rust** 1.70+ (for Tauri backend)
- **Python** 3.9+ (for crawler)
- **Git** for version control

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ETFILM-JPG/Emotional-Tagging.git
cd Emotional-Tagging
```

### 2. Install Rust (if not already installed)

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Install Tauri (Rust) Dependencies

```bash
cd src-tauri
cargo build
cd ..
```

### 5. Install Crawler Dependencies

```bash
cd crawler
pip install -r requirements.txt
cd ..
```

## Development

### Start Development Server

```bash
npm run dev
```

This will:
1. Start the Vite dev server (frontend)
2. Start the Tauri development server
3. Open the app in a development window with DevTools

### Run Crawler Manually

```bash
cd crawler
python main.py
```

Or run specific crawlers:

```bash
python -c "from douban import DoubanCrawler; DoubanCrawler().crawl_movies()"
```

## Building

### Build for All Platforms

```bash
npm run build
```

Output binaries will be in `src-tauri/target/release/bundle/`:

- **Windows**: `msi/Emotional-Tagging.msi`
- **macOS**: `dmg/Emotional-Tagging.dmg`
- **Linux**: `appimage/emotional-tagging.AppImage`

### Build for Specific Platform

```bash
# Windows
npm run tauri build -- --target x86_64-pc-windows-msvc

# macOS
npm run tauri build -- --target x86_64-apple-darwin

# Linux
npm run tauri build -- --target x86_64-unknown-linux-gnu
```

## Project Structure

```
emotional-tagging/
├─ src/                    # React frontend (TypeScript)
├─ src-tauri/              # Tauri + Rust backend
│  ├─ src/
│  │  ├─ main.rs          # Tauri app entry point
│  │  ├─ api.rs           # Tauri command handlers
│  │  ├─ db.rs            # SQLite operations
│  │  ├─ models.rs        # Data structures
│  │  └─ recommend.rs     # Recommendation algorithm
│  └─ Cargo.toml
├─ crawler/                # Python data crawler
│  ├─ main.py
│  ├─ douban.py
│  ├─ zhihu.py
│  └─ requirements.txt
├─ vite.config.ts
├─ tauri.conf.json
├─ package.json
└─ README.md
```

## Troubleshooting

### Windows: "no default toolchain configured"

```bash
rustup default stable
rustup target add x86_64-pc-windows-msvc
```

### macOS: "Xcode command line tools not found"

```bash
xcode-select --install
```

### Python: "ModuleNotFoundError: No module named 'scrapy'"

```bash
cd crawler
pip install -r requirements.txt
```

### Port already in use (5173)

```bash
# Change port in vite.config.ts or use environment variable
VITE_PORT=3000 npm run dev
```

## Performance Tips

1. **Use release build for testing**: `npm run build` (slower to compile, faster to run)
2. **Enable incremental compilation in Rust**: Set `CARGO_INCREMENTAL=1`
3. **Parallelize build**: Set `CARGO_BUILD_JOBS=4` (adjust to your CPU cores)

## Testing

```bash
# Type checking
npm run type-check

# Run Rust tests
cd src-tauri && cargo test && cd ..
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Additional Resources

- [Tauri Documentation](https://tauri.app/)
- [React Documentation](https://react.dev/)
- [Rust Book](https://doc.rust-lang.org/book/)
- [Shadcn/ui Components](https://ui.shadcn.com/)
