
if (error) {
    console.error('Error fetching release notes:', error)
    return NextResponse.json({ error: 'Failed to fetch release notes' }, { status: 500 })
}

return NextResponse.json(releaseNotes || [])
    } catch (error) {
    console.error('Error in changelog API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
}
