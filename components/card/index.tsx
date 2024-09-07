import { Button, Card as PaperCard } from "react-native-paper";

const Card = ({ children, ...props }: any) => {
  return (
    <PaperCard>
      <PaperCard.Title {...props} />
      <PaperCard.Content>{children}</PaperCard.Content>
      <PaperCard.Cover source={props.source} />
      <PaperCard.Actions>
        <Button>{props.cancelText}</Button>
        <Button>{props.confirmText}</Button>
      </PaperCard.Actions>
    </PaperCard>
  );
};

export default Card;
