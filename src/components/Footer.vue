<template>
  <div class="footer" :class="$mq">
		<div class="divider" />
		<div class="links-row" :class="$mq">
			<div class="ngd-link" :class="$mq"><a :href="ngd.url">{{ ngd.name }}</a></div>
			<div class="links-wrapper" :class="$mq">
				<a v-for="(link, index) in links" :key="index" :href="link.url" class="link">{{ link.name }}</a>
			</div>
		</div>
		<div class="contact" :class="$mq">
			<div class="email">{{ contact.email }}</div>
			<div class="address">{{ contact.address }}</div>
			<div class="address">{{ contact.copyright }}</div>
		</div>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'Footer',
  setup() {
    const ngd = reactive({
			name: 'ngdenterprise',
			url: 'http://www.ngdenterprise.com/'
		})

		const links = reactive([
			{
				name: 'Neo Protocol',
				url: 'https://github.com/neo-project'
			},
			{
				name: 'Developer',
				url: 'https://neo.org/dev'
			},
			{
				name: 'Github',
				url: 'https://github.com/ngdenterprise'
			}
		])

		const contact = reactive({
			email: 'admin@ngdenterprise.com',
			address: '8201 164th ave ne #200, redmond, wa 98052',
			copyright: '@2021 ngd enterprise'
		})

    return {
			ngd,
			links,
			contact
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.footer {
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 120px;

	&.mobile {
		margin-top: 40px;
	}
}

.divider {
	display: block;
  align-self: stretch;
	height: 1px;
	background-color: #979797;
	opacity: 0.52;
}

.ngd-link {
	> a {
		text-decoration: none;
	}

	&.mobile {
		margin: 18px 0;
	}
}

.links-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 40px 0;
	font-size: 16px;
	font-weight: 400;
	text-decoration: none;
	color: #00E599;

	&.mobile {
		flex-direction: column;
		justify-content: flex-start;
		margin: 20px 0;
	}
}

.links-wrapper {
	display: flex;
	justify-content: flex-end;

	.link {
		margin-left: 106px;
		color: #ffffff;
		text-decoration: none;
	}

	&.mobile {
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		> .link {
			margin: 0 0 12px 0;
		}
	}
}

.contact {
	display: flex;
	flex-direction: column;
	margin: 40px 0;
	
	&.mobile {
		align-items: center;
		margin: 0 0 44px 0;
	}
}

.email {
	margin-bottom: 6px;
	font-size: 16px;

	&.mobile {
		margin-bottom: 6px;
	}
}

.address {
	margin-bottom: 4px;
	font-size: 12px;
	opacity: 0.8;

	&.mobile {
		margin-bottom: 3px;
	}
}

</style>
