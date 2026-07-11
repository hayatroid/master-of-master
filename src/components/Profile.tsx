import { SITE } from "../site.config";
import Icon from "./Icon";

const Profile = () => {
  return (
    <header class="@container">
      {SITE.banner ? (
        <img class="aspect-3/1 w-full object-cover" src={SITE.banner} alt="" />
      ) : (
        <div class="bg-border aspect-3/1 w-full" />
      )}
      {SITE.avatar ? (
        <img
          class="mt-avatar-overlap h-avatar w-avatar border-background relative ml-4 rounded-full border-4 object-cover"
          src={SITE.avatar}
          alt=""
        />
      ) : (
        <div class="mt-avatar-overlap h-avatar w-avatar border-background bg-border relative ml-4 rounded-full border-4" />
      )}
      <div class="flex flex-col gap-3 px-4 pt-3 pb-4">
        <div class="flex flex-col gap-1">
          <p class="text-xl font-bold">{SITE.name}</p>
          <p class="text-text-muted">{SITE.handle}</p>
        </div>
        <p>{SITE.bio}</p>
        <ul class="text-text-muted flex flex-wrap gap-x-4 gap-y-1">
          {SITE.meta.map((item) => (
            <li class="flex items-center gap-1">
              <Icon name={item.icon} size={14} />
              {"href" in item ? (
                <a
                  class="text-primary wrap-anywhere hover:underline"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Profile;
