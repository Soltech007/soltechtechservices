// Simple version without AI
export async function summarizeProjectDetails(project: any) {
    return {
        summary: project.description || 'No description available',
        title: project.title || 'Untitled Project',
    };
}