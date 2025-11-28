export default function Footer() {
    const currentYear = new Date().getFullYear()
    const version = process.env.NEXT_PUBLIC_APP_VERSION || '0.5.0'

    return (
        <footer className="mt-auto py-6 px-4 border-t border-text-tertiary/10">
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-xs text-text-tertiary mb-1">
                    © {currentYear} Wacky Works Digital. All rights reserved.
                </p>
                <p className="text-xs text-text-tertiary/60">
                    v{version}
                </p>
            </div>
        </footer>
    )
}
