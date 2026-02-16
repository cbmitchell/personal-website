import { Link as RouterLink } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import type { ProjectMeta } from '../../types/project'

interface ProjectCardProps {
  project: ProjectMeta
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card sx={{ bgcolor: 'background.paper' }}>
      <CardActionArea component={RouterLink} to={`/projects/${project.slug}`}>
        <CardMedia
          component="img"
          image={project.image}
          alt={project.title}
          sx={{ aspectRatio: '16 / 9', objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {project.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {project.description}
          </Typography>

          {project.tags && project.tags.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {project.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Stack>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
