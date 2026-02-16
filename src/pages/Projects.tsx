import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { ProjectCard } from '../components/projects'
import { getAllProjects } from '../lib/projects'

export function Projects() {
  const projects = getAllProjects()

  return (
    <Box component="section" sx={{ maxWidth: 1080, mx: 'auto', py: 4, px: 2 }}>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid key={project.slug} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>

      {projects.length === 0 && (
        <Typography color="text.secondary">
          No projects yet. Check back soon!
        </Typography>
      )}
    </Box>
  )
}
