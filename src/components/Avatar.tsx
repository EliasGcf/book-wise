type AvatarProps = {
  imageUrl: string;
};

export function Avatar({ imageUrl }: AvatarProps) {
  return (
    <div className="h-10 w-10 rounded-full bg-gradient-vertical p-px">
      <img src={imageUrl} alt="" className="h-full w-full rounded-full" />
    </div>
  );
}
