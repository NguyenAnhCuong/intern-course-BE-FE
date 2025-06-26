import EditDevice from "@/components/admin/edit/edit.device";
import { Container } from "@mui/material";

const EditDevicePage = ({ params }: { params: { slug: string } }) => {
  return (
    <Container>
      <EditDevice id={params.slug} />
    </Container>
  );
};

export default EditDevicePage;
