import { ConcreteComponent, getCurrentInstance, resolveComponent } from 'vue';

type Props = {
  to?: string;
  href?: string;
};

type LinkTag<T> = T extends string ? string : ConcreteComponent;
type ComponentAttrs = { to: string };
type AnchorAttrs = { href: string };
type LinkAttrs<T> = T extends string ? AnchorAttrs : ComponentAttrs;

type UseLink<T> = [LinkTag<T>, LinkAttrs<T>];

export default function useLink() {
  const vm = getCurrentInstance();

  let attrs: ComponentAttrs | AnchorAttrs;
  let tag;

  if (!vm?.proxy) {
    throw new Error(`Could not resolve component instance in useLink`);
  }

  const props: Props = vm.proxy.$props;

  if (props.to) {
    if ('$nuxt' in vm.proxy) {
      tag = resolveComponent('nuxt-link');

      if (typeof tag === 'string') {
        throw new Error(
          `useLink: Component got a “to” prop but NuxtLink component couldn’t be found. To make a component behave like a traditional link, use the prop “href” instead.`
        );
      }
    } else {
      tag = resolveComponent('router-link');

      if (typeof tag === 'string') {
        throw new Error(
          `useLink: Component got a “to” prop but RouterLink component couldn’t be found. Is Vue Router installed? To make a component behave like a traditional link, use the prop “href” instead.`
        );
      }
    }

    attrs = {
      to: props.to,
    };
  } else if (props.href) {
    tag = 'a';

    attrs = {
      href: props.href,
    };
  } else {
    throw new Error(
      `useLink: Component must either have a "to" prop or an "href" prop in order to create the anchor element`
    );
  }

  const useLinkReturn: UseLink<typeof tag> = [tag, attrs];

  return useLinkReturn;
}
